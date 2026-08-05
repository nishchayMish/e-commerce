"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetHours?: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetHours = 11 }: CountdownTimerProps) {
  const [target] = useState<Date>(() => {
    const t = new Date();
    t.setHours(t.getHours() + targetHours);
    t.setMinutes(t.getMinutes() + 47);
    return t;
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: targetHours,
    minutes: 47,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
      setTimeLeft(calculateTimeLeft(target));
    }, 0);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [target]);

  const units = [
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <div className="flex items-end gap-2">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-end gap-2">
          <div className="flex flex-col items-center">
            <div className="min-w-13 sm:min-w-15 rounded-lg border border-gray-200 bg-[#fafafa] px-3 sm:px-4 py-2.5 text-center">
              <span className="text-xl sm:text-2xl font-semibold text-gray-900 tabular-nums tracking-tight">
                {mounted ? String(value).padStart(2, "0") : "--"}
              </span>
            </div>
            <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
              {label}
            </span>
          </div>
          {i < 2 && (
            <div className="pb-5 text-lg font-light leading-none text-gray-300">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
