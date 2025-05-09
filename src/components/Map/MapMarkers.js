import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const MapMarkers = ({ userLocation, events = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Function to determine marker color based on activity type
  const getMarkerIcon = (type) => {
    const colorMap = {
      music: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      sports: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      art: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      food: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      default: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    };
    return colorMap[type] || colorMap.default;
  };

  return (
    <>
      {/* User Location Marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />
      )}

      {/* Event Markers - Now safely handles undefined events */}
      {Array.isArray(events) && events.map(event => (
        event?.latitude && event?.longitude && (
          <Marker
            key={`event-${event.id}`}
            position={{ lat: event.latitude, lng: event.longitude }}
            icon={{
              url: getMarkerIcon(event.type) // Assign marker color based on type
            }}
            onClick={() => setSelectedMarker(event)}
          />
        )
      ))}

      {/* Info Window */}
      {selectedMarker && (
        <InfoWindow
          position={{ 
            lat: selectedMarker.latitude, 
            lng: selectedMarker.longitude 
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.name}</h3>
            <p>{selectedMarker.location}</p>
            <p>{selectedMarker.date}</p>
            {selectedMarker.rating && (
              <p>Rating: {selectedMarker.rating}</p>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MapMarkers;