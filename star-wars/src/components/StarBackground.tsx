import React, { useState, CSSProperties } from 'react';

// This function is defined outside the component to avoid re-creation
function generateStars(count: number) {
  let stars = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const opacity = Math.random();
    stars += `${x}vw ${y}vh rgba(255, 255, 255, ${opacity}), `;
  }
  return stars.slice(0, -2);
}

export const StarBackground = () => {
  // We use useState to generate the stars only on the initial render
  const [smallStars] = useState(generateStars(700));
  const [mediumStars] = useState(generateStars(200));
  const [largeStars] = useState(generateStars(100));

  const smallStarsStyles: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    background: 'transparent',
    boxShadow: smallStars,
    animation: 'twinkle 5s infinite',
  };

  const mediumStarsStyles: CSSProperties = {
    position: 'absolute',
    width: '2px',
    height: '2px',
    background: 'transparent',
    boxShadow: mediumStars,
    animation: 'twinkle 10s infinite',
  };

  const largeStarsStyles: CSSProperties = {
    position: 'absolute',
    width: '3px',
    height: '3px',
    background: 'transparent',
    boxShadow: largeStars,
    animation: 'twinkle 15s infinite',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0A0E17' }}></div>
      <div style={smallStarsStyles}></div>
      <div style={mediumStarsStyles}></div>
      <div style={largeStarsStyles}></div>
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};