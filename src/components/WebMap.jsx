import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase.utils';
import Navbar from "./Navbar";
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { collection, getDocs, query, where, or, addDoc, GeoPoint } from 'firebase/firestore';

const WebMap = ({noteLocation}) => {
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNoteLocation, setNewNoteLocation] = useState(null);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B", // red
      "#4ECDC4", // teal
      "#45B7D1", // blue
      "#96CEB4", // green
      "#FFEEAD", // yellow
      "#D4A5A5", // pink
      "#9B5DE5", // purple
      "#F15BB5", // magenta
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const userDoc = await getDocs(collection(db, "users"));
        const userData = userDoc.docs.find(doc => doc.id === user.uid)?.data();
        const friendUids = userData?.friends?.map(friend => friend.uid) || [];
        
        const notesQuery = query(
          collection(db, "test-notes"),
          or(
            where("visibility", "==", "public"),
            where("uid", "==", user.uid),
            ...friendUids.map(friendUid => where("uid", "==", friendUid))
          )
        );

        const querySnapshot = await getDocs(notesQuery);
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          color: getRandomColor(),
        }));

        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [user]);

  const handleMapClick = (event) => {
    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    setNewNoteLocation({ lat, lng });
    setShowNewNoteForm(true);
  };

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim() || !newNoteText.trim() || !newNoteLocation) return;

    try {
      const newNote = {
        title: newNoteTitle,
        text: newNoteText,
        location: new GeoPoint(newNoteLocation.lat, newNoteLocation.lng),
        timestamp: new Date(),
        uid: user.uid,
        visibility: "public"
      };

      const docRef = await addDoc(collection(db, "test-notes"), newNote);
      const noteWithId = {
        id: docRef.id,
        ...newNote,
        color: getRandomColor()
      };

      setNotes(prevNotes => [...prevNotes, noteWithId]);
      setShowNewNoteForm(false);
      setNewNoteTitle("");
      setNewNoteText("");
      setNewNoteLocation(null);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const position = noteLocation || { lat: 28.946209, lng: 77.724307 };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="relative">
        <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Navbar />
          <Map
            className="h-[92vh]"
            defaultZoom={13}
            defaultCenter={{ lat: position.lat, lng: position.lng }}
            mapId={"bd54733e09ef0083"}
            onClick={handleMapClick}
            onCameraChanged={(ev) => {
              console.log(
                "Camera changed:",
                ev.detail.center,
                "Zoom:",
                ev.detail.zoom
              );
            }}
          >
            {notes.map((note, index) => {
              // Convert GeoPoint to lat/lng object
              const markerPosition = {
                lat: note.location instanceof GeoPoint ? note.location.latitude : note.location._lat,
                lng: note.location instanceof GeoPoint ? note.location.longitude : note.location._long
              };

              return (
                <AdvancedMarker
                  key={note.id || index}
                  position={markerPosition}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="relative w-6 h-6">
                    <div
                      className="w-6 h-6 rounded-full shadow-lg cursor-pointer border-2 border-white"
                      style={{
                        backgroundColor: note.color,
                      }}
                    ></div>
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8"
                      style={{
                        borderTopColor: note.color,
                      }}
                    ></div>
                  </div>
                </AdvancedMarker>
              );
            })}
            {selectedNote && (
              <AdvancedMarker
                position={{
                  lat: selectedNote.location instanceof GeoPoint ? selectedNote.location.latitude : selectedNote.location._lat,
                  lng: selectedNote.location instanceof GeoPoint ? selectedNote.location.longitude : selectedNote.location._long
                }}
              >
                <div
                  className="absolute bottom-[42px] transform -translate-x-1/2 z-50 bg-white p-2 rounded-lg shadow-lg cursor-pointer min-w-[100px]"
                  onClick={() => setSelectedNote(null)}
                >
                  <p className="text-sm font-medium text-gray-800">
                    {selectedNote.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    {selectedNote.text}
                  </p>
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-b border-r border-gray-200"></div>
                </div>
              </AdvancedMarker>
            )}
          </Map>
        </APIProvider>

        {/* New Note Form Modal */}
        {showNewNoteForm && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold mb-4">Create New Note</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Enter note title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Text</label>
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    rows="3"
                    placeholder="Enter note text"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowNewNoteForm(false);
                      setNewNoteLocation(null);
                      setNewNoteTitle("");
                      setNewNoteText("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNote}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Create Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebMap;
