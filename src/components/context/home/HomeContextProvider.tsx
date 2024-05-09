'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type HomeContextType = {
  messageResponse: [string, Dispatch<SetStateAction<string>>]
  sending: [boolean, Dispatch<SetStateAction<boolean>>]
};

export const HomeContext = createContext<HomeContextType>({
  messageResponse: ['', () => {
  }],
  sending: [false, () => {
  }],
});

export default function HomeContextProvider({ children }: {
  children: ReactNode
}) {
  // Show status for xs screen
  const [isShowSidebarMd, setIsShowSidebarMd] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const value: HomeContextType = {
    messageResponse: [isShowSidebarMd, setIsShowSidebarMd],
    sending: [sending, setSending],
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}
