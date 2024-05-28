'use client';
import { ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessionStorage } from 'react-use';

export default function AuthenticateLayout({ children }: Readonly<{ children: ReactNode; }>) {


  const param = useSearchParams();
  const [, setToken] = useSessionStorage('accessToken', '');
  useEffect(() => {
    const token = param.get('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return children;
}