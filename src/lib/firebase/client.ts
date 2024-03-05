import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import { APIResponse } from '@/types';
import { getApp, getApps, initializeApp } from 'firebase/app';

export const clientApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const clientAuth = getAuth(clientApp);

export async function clientSignInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const userCreds = await signInWithPopup(clientAuth, provider);
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
      }),
    });

    const resBody: APIResponse<string> = await response.json();
    if (response.ok && resBody.success) {
      return true;
    }

    return false;
  } catch (e) {
    console.error('Error signing in with Google', e);
    return false;
  }
}

export async function clientSignOut() {
  try {
    await clientAuth.signOut();

    const response = await fetch('/api/auth/sign-out', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resBody: APIResponse<string> = await response.json();
    if (response.ok && resBody.success) {
      return true;
    }

    return false;
  } catch (e) {
    console.error('Error signing out with Google', e);
    return false;
  }
}
