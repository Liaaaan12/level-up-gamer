import React from 'react';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">PC Gamers</a></li>
        <li><a href="#">Notebooks</a></li>
        <li><a href="#">Consolas</a></li>
        <li><a href="#">Periféricos</a></li>
        <li><a href="#">Sillas Gamers</a></li>
        <li><a href="#">Juegos</a></li>
        <li><a href="#">Merchandising</a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;