import React from 'react';

export default function ShinyText({ children, className = '', speed = 2.8, style = {} }) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{ '--shine-speed': `${speed}s`, ...style }}
    >
      {children}
    </span>
  );
}
