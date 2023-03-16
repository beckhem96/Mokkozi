import * as React from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/calendar.css';

export const Example = () => {
  const constraintsRef = useRef(null);

  return (
    <>
      <motion.div className="drag-area" ref={constraintsRef} />
      <motion.div
        drag
        style={{
          background: 'black',
          height: 100,
          width: 100,
          borderRadius: 5,
          margin: 2,
        }}
        // dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        dragConstraints={constraintsRef}
      />
    </>
  );
};
