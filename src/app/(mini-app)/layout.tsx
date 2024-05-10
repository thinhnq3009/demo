'use client';
import React, { useEffect, useState } from 'react';
import { min } from 'three/examples/jsm/nodes/math/MathNode';

export default function BaseLayout({ children }: { children: React.ReactNode }) {

  const [screenHeight, setScreenHeight] = useState(window.innerHeight || undefined);

  const updateScreenHeight = () => {
    setScreenHeight(window.visualViewport?.height);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenHeight);
    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);
  return <div className="bg-city bg-cover bg-center bg-no-repeat h-screen w-100 ">
    <div className="w-base mx-auto pt-4" style={{ height: `min(100vh,${screenHeight}px` }}>
      {children}
    </div>
  </div>;
}