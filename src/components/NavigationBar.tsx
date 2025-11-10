import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const categories = [
  'PC Gamers',
  'Notebooks',
  'Consolas',
  'Periféricos',
  'Sillas Gamers',
  'Juegos',
  'Merchandising',
];

const NavigationBar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        {categories.map((c) => (
          <li key={c}><Link to={`/shop`}>{c}</Link></li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;