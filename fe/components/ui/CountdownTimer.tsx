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
    <div className="flex items-end gap-2 sm:gap-3">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-end gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 min-w-[56px] sm:min-w-[72px] px-3 sm:px-5 py-3 sm:py-4 text-center">
              <span className="text-2xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
                {mounted ? String(value).padStart(2, "0") : "--"}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/50 mt-2 uppercase tracking-[0.15em] font-medium">
              {label}
            </span>
          </div>
          {i < 2 && (
            <div className="text-white/30 text-2xl sm:text-3xl font-light pb-6 sm:pb-8 leading-none">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
