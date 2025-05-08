import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>EventsExplorer</h1>
      <nav className="nav">
        <button className="nav-btn active">Home</button>
        <button className="nav-btn">Discover</button>
        <button className="nav-btn">Saved</button>
        <button className="nav-btn">About</button>
      </nav>
    </header>
  );
}

export default Header;