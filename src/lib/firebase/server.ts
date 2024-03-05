import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { SessionCookieOptions, getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

export const serverApp =
  getApps().length !== 0
    ? getApp()
    : initializeApp({
        credential: cert(
          JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT as string)
        ),
      });

export const serverAuth = getAuth(serverApp);

export async function isUserAuthenticated(session?: string) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    await serverAuth.verifySessionCookie(_session);
    return true;
  } catch (e) {
    return false;
  }
}

async function getSession() {
  try {
    return cookies().get('__session')?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOption: SessionCookieOptions
) {
  return serverAuth.createSessionCookie(idToken, sessionCookieOption);
}

export async function revokeAllSessions(session: string) {
  const decodedToken = await serverAuth.verifySessionCookie(session);

  return await serverAuth.revokeRefreshTokens(decodedToken.sub);
}
