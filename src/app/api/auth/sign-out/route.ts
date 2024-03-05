import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { revokeAllSessions } from '@/lib/firebase/server';
import { APIResponse } from '@/types';

export async function GET() {
  const sessionCookie = cookies().get('__session')?.value;

  if (!sessionCookie)
    return NextResponse.json<APIResponse<string>>(
      {
        success: false,
        error: 'Session not found.',
      },
      {
        status: 400,
      }
    );

  cookies().delete('__session');

  await revokeAllSessions(sessionCookie);

  return NextResponse.json<APIResponse<string>>(
    {
      success: true,
      data: 'Signed out successfully.',
    },
    {
      status: 200,
    }
  );
}
