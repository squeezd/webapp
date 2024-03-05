'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';
import {
  AiOutlineCloud,
  AiOutlineDashboard,
  AiOutlineLock,
} from 'react-icons/ai';

export const Reason: FC = function () {
  const reasons = [
    {
      reason: 'Keep Your link safely in our secure database.',
      Icon: AiOutlineCloud,
    },
    {
      reason: 'Easily enable and disable your links if needed.',
      Icon: AiOutlineLock,
    },
    {
      reason: "We won't keeps you waiting by watching ads",
      Icon: AiOutlineDashboard,
    },
  ];

  const { theme } = useTheme();

  return (
    <div className="flex justify-between space-x-40 items-center">
      {reasons.map((r) => (
        <div key={r.reason} className="flex flex-col items-center mx-4 w-12">
          <r.Icon color={theme === 'dark' ? 'white' : 'black'} size="4em" />
          <div className="text-center pt-8 font-medium w-40">{r.reason}</div>
        </div>
      ))}
    </div>
  );
};
