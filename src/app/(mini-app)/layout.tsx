import React from 'react';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-city bg-cover bg-center bg-no-repeat h-screen w-100 py-4">
        <div className="w-base mx-auto h-full">
            {children}
        </div>
    </div>;
}