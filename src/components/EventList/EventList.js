import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { fetchEvents } from '../../services/eventsService';
import './EventList.css';

const EventList = ({ places = [] }) => {
  const [viewMode, setViewMode] = useState('list');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data || []); // Ensure we always have an array
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="events-container">
      <div className="view-toggle">
        <button 
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
        >
          List
        </button>
        <button 
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          Grid
        </button>
      </div>
      <h2>Nearby Activities</h2>
      <div className={`events-list ${viewMode}`}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        {Array.isArray(places) && places.map(place => (
          <EventCard 
            key={place.place_id || place.id} 
            event={{
              id: place.place_id || place.id,
              name: place.name,
              location: place.vicinity || place.location,
              rating: place.rating,
              date: place.date || 'Ongoing'
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;