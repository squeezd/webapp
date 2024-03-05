'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clientSignInWithGoogle, clientSignOut } from '@/lib/firebase/client';
import { useUser } from '@/lib/firebase/hooks';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC, MouseEventHandler } from 'react';

export const Navbar: FC = function () {
  const router = useRouter();
  const user = useUser();

  const handleSignIn: MouseEventHandler = async function (e) {
    e.preventDefault();

    const isOk = await clientSignInWithGoogle();
    if (isOk) {
      router.refresh();
    }
  };

  const handleSignOut: MouseEventHandler = async function (e) {
    e.preventDefault();

    const isOK = await clientSignOut();
    if (isOK) {
      router.refresh();
    }
  };

  return (
    <nav className="w-screen px-4 py-4 md:pr-10 flex fixed justify-between items-center bg-black border-white">
      <div className="text-white font-bold text-xl">Squeezd</div>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-8">
              <AvatarImage src={user.photoURL!} />
              <AvatarFallback>
                {user.displayName?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Manage API Keys</DropdownMenuItem>
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className={cn('outline outline-1 outline-white')}
          size="sm"
          onClick={handleSignIn}
        >
          Sign in
        </Button>
      )}
    </nav>
  );
};
