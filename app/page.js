"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TermsModal from "./components/TermsModal";
import Checkout from "./components/Checkout";

export default function Home() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date("2024-11-13T14:00:00"); // Change this to your target date and time

  useEffect(() => {
    const snapScript = "https://app.midtrans.com/snap/snap.js"; // production
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    // Countdown function
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(intervalId); // Stop the countdown if the target date has passed
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown(); // Initial call
    const intervalId = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(intervalId);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-FFDinPro-Regular)] bg-dark relative">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url(/imgbg.png)' }} />
      <Checkout />
      <main className="flex flex-col sm:items-start relative flex-grow z-10">
        <div className="flex justify-between items-center mb-8">
          <Image className="object-cover w-32 max-w-xs" src="/dafam.png" alt="Content Image" width={500} height={300} priority />
          <Image className="object-cover w-12 max-w-xs" src="/artotel.png" alt="Content Image" width={500} height={500} priority />
        </div>

        <div className="text-2xl text-left sm:text-left text-foreground">SPECIAL ROAD TO</div>
        <div className="text-4xl text-left sm:text-left font-[family-name:var(--font-FFDinPro-Black)] text-foreground">
          14<sup>th</sup>ANNIVERSARY
        </div>
        <div className="text-5xl text-left sm:text-left font-[family-name:var(--font-FFDinPro-Black)] text-artotel">
          <p>WAR</p>
          <p>ROOM</p>
          <p>VOUCHER</p>
        </div>

        <div className="bg-white bg-opacity-70 shadow-lg rounded-2xl p-1">
          <div className="border-2 border-dashed border-gray-600 p-4 rounded-2xl">
            <div className="text-md text-left sm:text-left">
              <p>3 - 17 November 2024 Only at 14:00, for 1 Minute 4 second Stay Period 18 - 30 November 2024</p>
            </div>
          </div>
        </div>

        <div className="absolute top-56 right-0 z-20">
          <Image className="object-cover w-24 max-w-xs zoom-animation" src="/price.png" alt="Floating Price" width={200} height={200} priority />
        </div>

        <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
          
        <div className="z-5 flex justify-center mt-40">
          <button className="text-lg flex items-center justify-center text-md md:text-base h-10 md:h-12 px-4 md:px-5 md:min-w-44 text-background" onClick={() => setTermsModalOpen(true)}>
            *Read our terms & conditions
          </button>
        </div>
        <div className="text-3xl text-center sm:text-center">
          <p>{countdown.days} days, {countdown.hours} : {countdown.minutes} : {countdown.seconds}</p>
        </div>
      </main>
    </div>
  );
}