import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase.utils';
import { useAuth } from '../contexts/AuthContext';
import { handleFirebaseError } from '../utils/firebase.utils';

const libraries = ['places'];

const WebMap = ({ onNoteClick }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser) return;

      try {
        setIsLoading(true);
        setError(null);

        // Create a query for notes
        const notesRef = collection(db, 'notes');
        const q = query(
          notesRef,
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const notesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMarkers(notesData);
      } catch (err) {
        handleFirebaseError(err);
        setError('Failed to load notes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser]);

  const handleMapClick = (event) => {
    if (!currentUser) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    onNoteClick({ lat, lng });
  };

  if (loadError) {
    return (
      <div className="error-container">
        <h2>Error loading map</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerClassName="map"
        zoom={10}
        center={{ lat: 40.7128, lng: -74.0060 }}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.content}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading notes...</p>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default WebMap;
