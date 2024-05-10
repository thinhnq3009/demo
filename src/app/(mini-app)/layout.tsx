'use client';
import React from 'react';

export default function BaseLayout({ children }: { children: React.ReactNode }) {

  // const [screenHeight, setScreenHeight] = useState(window.innerHeight || undefined);
  //
  // const updateScreenHeight = () => {
  //   setScreenHeight(window.visualViewport?.height);
  // };
  //
  // useEffect(() => {
  //   window.addEventListener('resize', updateScreenHeight);
  //   return () => {
  //     window.removeEventListener('resize', updateScreenHeight);
  //   };
  // }, []);
  return <div className="bg-city bg-cover bg-center bg-no-repeat h-screen w-100 ">
    <div className="w-base mx-auto pt-4 h-screen"
      // style={{ height: `${screenHeight}px` }}
    >
      {children}
    </div>
  </div>;
}