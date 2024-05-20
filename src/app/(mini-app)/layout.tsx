'use client';

import React from 'react';
import GlobalContextProvider from '@/components/context/GlobalContextProvider';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const manifestUrl =
    'https://thainguyen1710.github.io/my-twa-manifes/manifest.json';
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="bg-city bg-cover bg-center bg-no-repeat h-screen w-100 ">
        <div
          className="w-base mx-auto pt-4 h-screen"
        >
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </div>
      </div>
    </TonConnectUIProvider>
  );
}
