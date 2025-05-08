import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { getCurrentLocation } from '../../services/mapsService';
import './Map.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultMapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York as fallback

const PLACE_TYPES = {
  museums: 'museum',
  parks: 'park',
  restaurants: 'restaurant',
  landmarks: 'tourist_attraction'
};

const MARKER_ICONS = {
  event: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  place: {
    museum: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    park: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    restaurant: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    tourist_attraction: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
  }
};

const MapContainer = ({ events, places, onUserLocation, onPlacesLoaded }) => {
  // All hooks must be inside the component function
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(defaultLocation);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placesLoading, setPlacesLoading] = useState(false);

  // Initialize user location and map
  useEffect(() => {
    const initMap = async () => {
      try {
        const location = await getCurrentLocation();
        setUserLocation(location);
        if (onUserLocation) onUserLocation(location);
      } catch (error) {
        console.error("Geolocation error:", error);
        setMapError("Couldn't get your location. Showing New York instead.");
        setUserLocation(defaultLocation);
        if (onUserLocation) onUserLocation(defaultLocation);
      } finally {
        setLoading(false);
      }
    };
    initMap();
  }, [onUserLocation]);

  // Load nearby places when map and location are ready
  useEffect(() => {
    if (!map || !window.google || !userLocation) return;

    const fetchAllPlaces = async () => {
      setPlacesLoading(true);
      try {
        const service = new window.google.maps.places.PlacesService(map);
        const allPlaces = [];
        
        // Fetch places of each type
        for (const [category, type] of Object.entries(PLACE_TYPES)) {
          const places = await new Promise((resolve) => {
            service.nearbySearch({
              location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
              radius: 5000, // 2km radius
              type: type
            }, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                resolve(results.map(place => ({
                  ...place,
                  category
                })));
              } else {
                resolve([]);
              }
            });
          });
          allPlaces.push(...places);
        }

        onPlacesLoaded(allPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setPlacesLoading(false);
      }
    };

    fetchAllPlaces();
  }, [map, userLocation, onPlacesLoaded]);

  if (loading) return <div className="loading-overlay">Loading map...</div>;
  if (mapError) return <div className="map-error">{mapError}</div>;

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation}
        zoom={13}
        options={defaultMapOptions}
        onLoad={map => setMap(map)}
      >
        {/* User Location Marker */}
        <Marker
          position={userLocation}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />

        {/* Event Markers */}
        {events.map(event => (
          <Marker
            key={`event-${event.id}`}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => setSelectedMarker(event)}
            icon={{
              url: MARKER_ICONS.event
            }}
          />
        ))}

        {/* Place Markers */}
        {places.map(place => (
          <Marker
            key={`place-${place.place_id}`}
            position={place.geometry.location}
            onClick={() => setSelectedMarker(place)}
            icon={{
              url: MARKER_ICONS.place[place.category] || MARKER_ICONS.place.tourist_attraction
            }}
          />
        ))}

        {/* Info Window */}
        {selectedMarker && (
          <InfoWindow
            position={
              selectedMarker.geometry 
                ? selectedMarker.geometry.location 
                : { lat: selectedMarker.latitude, lng: selectedMarker.longitude }
            }
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.name}</h3>
              <p>{selectedMarker.vicinity || selectedMarker.location}</p>
              {selectedMarker.rating && (
                <p>Rating: {selectedMarker.rating}</p>
              )}
              {selectedMarker.category && (
                <p>Category: {selectedMarker.category}</p>
              )}
            </div>
          </InfoWindow>
        )}

        {/* Loading Indicator */}
        {placesLoading && (
          <div className="places-loading">
            <div className="loading-spinner"></div>
            Loading nearby places...
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;