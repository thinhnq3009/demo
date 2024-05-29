'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { User } from '@/models/User';
import { userApi } from '@/apis/userApi';
import { Character } from '@/models/Character';
import { useLocalStorage } from 'react-use';

type GlobalContextType = {
  loggedUser: [User | undefined, Dispatch<SetStateAction<User | undefined>>]
  character: [Character[], Dispatch<SetStateAction<Character[]>>]
  selectedIndex: [number, Dispatch<SetStateAction<number>>]
};

export const GlobalContext = createContext<GlobalContextType>({
  loggedUser: [undefined, () => {
  }],
  character: [[], () => {
  }],
  selectedIndex: [0, () => {
  }],
});

export default function GlobalContextProvider({ children }: {
  children: ReactNode
}) {
  const [, setCharacter] = useLocalStorage<Character | undefined>('character', undefined);
  const loggedUserState = useState<User | undefined>();
  const characterState = useState<Character[]>([]);
  const selectedIndexState = useState<number>(0);
  // Load user info
  const { authenticateMe, getCharacter } = userApi();


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

  useEffect(() => {
    setCharacter(characterState[0][selectedIndexState[0]]);
  }, [selectedIndexState[0], characterState[0]]);

  const value: GlobalContextType = {
    loggedUser: loggedUserState,
    character: characterState,
    selectedIndex: selectedIndexState,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
