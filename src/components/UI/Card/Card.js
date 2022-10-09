import React from 'react';

import classes from './Card.module.css';

// A content container
export default function Card(props) {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
}
