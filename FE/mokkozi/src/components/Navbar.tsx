import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';
import Modal from './Modal';

function Navbar() {
  const userId = Math.floor(Math.random() * 101);
  const MyStudyUrl = `mystudy/${userId}`;
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleModalCancel = () => setOpen(false);
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
      <div>
        <h2 onClick={handleClick}>Login</h2>
        <Modal isOpen={isOpen} onCancel={handleModalCancel} />
      </div>
    </nav>
  );
}

export default Navbar;
