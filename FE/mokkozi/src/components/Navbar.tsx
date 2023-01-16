import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';
function Navbar() {
  const userId = Math.floor(Math.random() * 101);
  const MyStudyUrl = `mystudy/${userId}`;
  return (
    <nav>
      <div>
        <NavLink to="/">
          <h1>Mokkozi</h1>
        </NavLink>
      </div>
      <div>
        <NavLink to={MyStudyUrl}>MyStudy</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
