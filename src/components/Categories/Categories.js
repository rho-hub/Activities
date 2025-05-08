import React from 'react';
import './Categories.css';

const Categories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="categories">
      <button 
        className={`category-btn ${selectedCategory === 'events' ? 'active' : ''}`}
        onClick={() => onSelectCategory('events')}
      >
        Events
      </button>
      <button 
        className={`category-btn ${selectedCategory === 'wildlife' ? 'active' : ''}`}
        onClick={() => onSelectCategory('wildlife')}
      >
        Wildlife
      </button>
      <button 
        className={`category-btn ${selectedCategory === 'waterpark' ? 'active' : ''}`}
        onClick={() => onSelectCategory('waterpark')}
      >
        Water Park
      </button>
    </div>
  );
};

export default Categories;