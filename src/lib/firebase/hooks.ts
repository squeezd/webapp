import { clientAuth } from '@/lib/firebase/client';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<User | null>();
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    clientAuth.onAuthStateChanged(function (u) {
      setUser(u);
      setIsUserLoading(false);
    });

    clientAuth.beforeAuthStateChanged(() => {
      setIsUserLoading(true);
    });
  }, []);

  return {
    user,
    isUserLoading,
  };
}
