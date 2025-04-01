// lib/logoutClient.ts
'use client';

import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/userContext';

export function useLogout() {
  const router = useRouter();
  const {setUser} = useUserContext()

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    router.push('/'); // SPA redirect
  };

  return logout;
}
