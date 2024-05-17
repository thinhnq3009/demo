'use client';
import React from 'react';
import GlobalContextProvider from '@/components/context/GlobalContextProvider';

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
    <div className="w-[396px] mx-auto pt-5 h-screen"
      // style={{ height: `${screenHeight}px` }}
    >
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </div>
  </div>;
}