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
import { Toggle } from '@/components/ui/toggle';
import { clientSignInWithGoogle, clientSignOut } from '@/lib/firebase/client';
import { useUser } from '@/lib/firebase/hooks';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, MouseEventHandler } from 'react';
import { P, match } from 'ts-pattern';

export const Navbar: FC = function () {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { theme, setTheme } = useTheme();

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

  const handleSwitchTheme: MouseEventHandler = function (e) {
    e.preventDefault();

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="w-screen fixed px-4 py-2 min-h-8 flex justify-between items-center opacity-90 dark:bg-black bg-white border-b-[1px] dark:border-b-white border-b-black">
      <Link href="/" className="text-black dark:text-white font-bold text-xl">
        Squeezd
      </Link>

      <div className="flex items-center space-x-4">
        {match(isUserLoading)
          .with(true, () => (
            <svg
              className="animate-spin bg-white rounded-md h-5 w-5 mr-3"
              viewBox="0 0 24 24"
            />
          ))
          .otherwise(() =>
            match(user)
              /**
               * if not authenticated
               */
              .with(P.nullish, () => (
                <Button
                  className={cn('outline outline-1 outline-white')}
                  size="sm"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              ))

              /**
               * if authenticated
               */
              .otherwise((user) => (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={user.photoURL!}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback>
                        {user.displayName?.at(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/api-key-management">Manage API Keys</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))
          )}

        <Toggle aria-label="Toggle theme" onClick={handleSwitchTheme}>
          {match(theme)
            .with(P.union(P.nullish, 'dark'), () => <SunIcon />)
            .otherwise(() => (
              <MoonIcon />
            ))}
        </Toggle>
      </div>
    </nav>
  );
};
