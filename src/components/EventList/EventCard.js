import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.location}</p>
      <p>{event.date} • {event.time}</p>
      {event.rating && <p className="rating">{event.rating} ({event.reviewCount} reviews)</p>}
      <button className="save-btn">Save</button>
    </div>
  );
};

export default EventCard;