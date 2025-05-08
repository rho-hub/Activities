import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/Search/SearchBar';
import MapContainer from './components/Map/MapContainer';
import ActivityList from './components/ActivityList/ActivityList';
import { fetchEvents } from './services/eventsService';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <Header />
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      <div className="main-content">
        {/* Left Section - Map */}
        <div className="map-section">
          {loading && <div className="loading-overlay">Loading map...</div>}
          <MapContainer 
            events={events}
            places={places}
            onUserLocation={setUserLocation}
            onPlacesLoaded={setPlaces}
          />
        </div>
        
        {/* Right Section - List */}
        <div className="list-section">
          <ActivityList 
            events={events}
            places={places}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;