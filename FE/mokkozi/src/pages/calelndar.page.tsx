import React, { useState } from 'react';
import MainLayout from '../styles/Home';
import Button from '../styles/Button';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Example } from '../components/Example';
import '../styles/calendar.css';
function Calendar() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>일정관리</h1>
      <div className="calendar-container">
        <Example />
      </div>
    </>
  );
}

export default Calendar;
