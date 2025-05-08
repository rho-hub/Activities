import React from 'react';
import ActivityCard from './ActivityCard';
import './ActivityList.css';

const ActivityList = ({ events, places, userLocation }) => {
    // Group places by category
    const placesByCategory = places.reduce((acc, place) => {
      if (!acc[place.category]) acc[place.category] = [];
      acc[place.category].push(place);
      return acc;
    }, {});
  
    return (
      <div className="activity-list">
        <h2>Nearby Activities</h2>
        
        {/* Events Section */}
        <div className="activity-section">
          <h3>Events ({events.length})</h3>
          {events.map(event => (
            <ActivityCard 
              key={`event-${event.id}`}
              activity={{ ...event, type: 'event' }}
            />
          ))}
        </div>
  
        {/* Places by Category */}
        {Object.entries(placesByCategory).map(([category, categoryPlaces]) => (
          <div key={category} className="activity-section">
            <h3>
              {category.charAt(0).toUpperCase() + category.slice(1)} 
              ({categoryPlaces.length})
            </h3>
            {categoryPlaces.map(place => (
              <ActivityCard
                key={`place-${place.place_id}`}
                activity={{ ...place, type: 'place' }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

// Helper function to calculate distance between coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default ActivityList;