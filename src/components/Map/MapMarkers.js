import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const MapMarkers = ({ userLocation, events = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

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