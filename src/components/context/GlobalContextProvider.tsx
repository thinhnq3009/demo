'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '@/models/User';
import { useSearchParams } from 'next/navigation';
import { useApi } from '@/apis/useApi';

type GlobalContextType = {
  loggedUser: [User | undefined, Dispatch<SetStateAction<User | undefined>>]
};

export const GlobalContext = createContext<GlobalContextType>({
  loggedUser: [undefined, () => {
  }],
});

export default function GlobalContextProvider({ children }: {
  children: ReactNode
}) {
  // Show status for xs screen
  const loggedUserState = useState<User | undefined>();

  // Load user info
  const { getUserInfoByToken } = useApi();
  const param = useSearchParams();


  useEffect(() => {
    const token = param.get('token');
    if (!token) return;
    getUserInfoByToken(token)
      .then(response => {
        loggedUserState[1](response);
      })
      .catch(err => {
        console.error(err);
        // TODO LOGIN FAILED
      });

  }, []);

  const value: GlobalContextType = {
    loggedUser: loggedUserState,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
