"use client";

import { useMemo } from 'react';

const Snowfall = () => {
  const snowflakes = useMemo(() => {
    const flakeCount = 100;
    return Array.from({ length: flakeCount }).map((_, i) => {
      const style = {
        '--fall-h-end': `${Math.random() * 200 - 100}px` as React.CSSProperties['--fall-h-end'],
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        left: `${Math.random() * 100}vw`,
        opacity: Math.random() * 0.5 + 0.3,
      };
      return <div key={i} className="snowflake" style={style}></div>;
    });
  }, []);

  return <div aria-hidden="true" className="snowfall-container">{snowflakes}</div>;
};

export default Snowfall;
