'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '@/models/User';
import { useApi } from '@/apis/useApi';
import { Character } from '@/models/Character';

type GlobalContextType = {
  loggedUser: [User | undefined, Dispatch<SetStateAction<User | undefined>>]
  character: [Character[], Dispatch<SetStateAction<Character[]>>]
};

export const GlobalContext = createContext<GlobalContextType>({
  loggedUser: [undefined, () => {
  }],
  character: [[], () => {
  }],
});

export default function GlobalContextProvider({ children }: {
  children: ReactNode
}) {
  // Show status for xs screen
  const loggedUserState = useState<User | undefined>();
  const characterState = useState<Character[]>([]);

  // Load user info
  const { authenticateMe, getCharacter } = useApi();


  useEffect(() => {
    authenticateMe()
      .then(response => {
        loggedUserState[1](response);
        getCharacter().then(res => {
          characterState[1](res);
        });
      })
      .catch(err => {
        console.error(err);
        // TODO LOGIN FAILED
      });

  }, []);

  const value: GlobalContextType = {
    loggedUser: loggedUserState,
    character: characterState,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
