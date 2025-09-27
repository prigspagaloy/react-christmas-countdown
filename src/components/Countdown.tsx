import Fireworks from "./Fireworks";
import { useState, useEffect, useRef } from "react";

export default function Countdown() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const targetDate = useRef(new Date(`December 25, ${currentYear}`).getTime());
  const [currentTime, setCurrentTime] = useState(Date.now());

  const remainingTime = targetDate.current - currentTime;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic Year
  useEffect(() => {
    if (remainingTime <= 0) {
      targetDate.current = new Date(
        `December 25, ${setCurrentYear((prev) => prev + 1)}`
      ).getTime();
    }
  }, [remainingTime]);

  return (
    <>
      <Fireworks remainingTime={remainingTime} />
      <div className="p-[1rem] relative font-christmas font-bold text-white text-shadow-[2px_2px_1px_#000000] flex flex-col gap-10 z-10">
        <h1 className="text-6xl md:text-8xl text-center self-center">
          Christmas Countdown {currentYear}
        </h1>
        <div>
          <div className="flex flex-col lg:flex-row lg:flex-wrap items-center-safe justify-center-safe gap-3 md:gap-5 lg:gap-7 text-4xl md:text-6xl text-center">
            <span>{days} days</span>
            <span>{hours < 10 ? "0" + hours : hours} hours</span>
            <span>{minutes < 10 ? "0" + minutes : minutes} minutes</span>
            <span>{seconds < 10 ? "0" + seconds : seconds} seconds</span>
            <h3 className="md:w-full text-4xl md:text-6xl text-center">
              until Christmas
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
