import { clientAuth } from '@/lib/firebase/client';
import { User } from 'firebase/auth';
import { useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<User | null>();
  clientAuth.onAuthStateChanged(function (u) {
    setUser(u);
  });

  return user;
}
