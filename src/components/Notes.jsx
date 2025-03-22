import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase.utils";
import { collection, getDocs, query, where, or } from "firebase/firestore";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import WebMap from "./WebMap";

// Utility functions
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatDistance = (distance) => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const deg2rad = (deg) => deg * (Math.PI / 180);

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Notes = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // Fetch notes when location or user changes
  useEffect(() => {
    const getUserFriends = async (userId) => {
      try {
        const userDoc = await getDocs(collection(db, "users"));
        const userData = userDoc.docs.find(doc => doc.id === userId)?.data();
        return userData?.friends?.filter(friend => friend.status === true) || [];
      } catch (error) {
        console.error("Error in getUserFriends:", error);
        return [];
      }
    };

    const fetchNotes = async () => {
      if (!userLocation || !user) {
        console.log("No user location or user");
        return;
      }

      try {
        console.log("Fetching notes for user:", user.uid);

        const friends = await getUserFriends(user.uid);
        const friendUids = friends.map(friend => friend.uid);

        // Create queries for notes that match our security rules
        const notesQuery = query(
          collection(db, "test-notes"),
          or(
            where("visibility", "==", "public"),
            where("uid", "==", user.uid),
            ...friendUids.map(friendUid => where("uid", "==", friendUid))
          )
        );

        const notesSnapshot = await getDocs(notesQuery);
        console.log("Notes found:", notesSnapshot.size);

        // Query users to get usernames
        const userIdsArray = [user.uid, ...friendUids];
        const usersQuery = query(
          collection(db, "users"),
          where("uid", "in", userIdsArray)
        );
        const usersSnapshot = await getDocs(usersQuery);

        // Create usernames map
        const usernames = {};
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          usernames[userData.uid] = userData.username || "Anonymous";
        });

        // Process notes
        const notesData = notesSnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
            username: usernames[doc.data().uid] || "Anonymous",
          }))
          .map((note) => {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              note.location._lat,
              note.location._long
            );
            return { ...note, distance };
          })
          .sort((a, b) => a.distance - b.distance);

        console.log("Processed notes:", notesData);
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [userLocation, user]);

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="text-3xl font-semibold mt-6 mb-4">Notes</div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex justify-between p-4 w-200 rounded-md shadow-md opacity-100 cursor-pointer bg-[#00ffc8]"
              onClick={() => {
                navigate('/webmap', { state: { noteLocation: note.location } });
              }
              }
            >
              <div>
                <div className="text-xl font-semibold">{note.title}</div>
                <div className="text-l font-semibold opacity-80">- {note.username}</div>
                <div className="text-sm text-gray-600">
                  {formatDate(note.timestamp)}
                </div>
              </div>
              <span>{formatDistance(note.distance)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
