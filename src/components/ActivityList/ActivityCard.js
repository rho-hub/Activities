import React from 'react';
import './ActivityCard.css';

const ActivityCard = ({ activity }) => {
  return (
    <div className={`activity-card ${activity.type}`}>
      <h3>{activity.name}</h3>
      <p className="location">{activity.location}</p>
      {activity.distance && (
        <p className="distance">{activity.distance} away</p>
      )}
      {activity.rating && (
        <p className="rating">★ {activity.rating}</p>
      )}
      {activity.date && (
        <p className="date">{activity.date}</p>
      )}
    </div>
  );
};

export default ActivityCard;