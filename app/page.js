"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TermsModal from "./components/TermsModal";
import Checkout from "./components/Checkout";

export default function Home() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const curDate = new Date();
  const eventDate = new Date("2024-11-03T14:00:00");
  const startDate = new Date("2024-11-03T14:00:00");
  const endDate = new Date("2024-11-17T14:01:05");

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const snapScript = "https://app.midtrans.com/snap/snap.js"; // production
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    let intervalId;

    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        eventDate.setDate(eventDate.getDate() + 1);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }

      if (now >= startDate && now <= endDate) {
        const checkoutStartTime = new Date(now);
        checkoutStartTime.setHours(14, 0, 0);

        const checkoutEndTime = new Date(checkoutStartTime);
        checkoutEndTime.setSeconds(64);

        if (now >= checkoutStartTime && now <= checkoutEndTime) {
          setIsCheckoutVisible(true);
        } else {
          setIsCheckoutVisible(false);
        }
      } else {
        setIsCheckoutVisible(false);
      }
    };

    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(intervalId);
      document.body.removeChild(script);
    };

  }, []);

  return (
      <div className="absolute inset-0 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-FFDinPro-Regular)] bg-dark z-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/imgbg.png)' }}
      />

      {isCheckoutVisible && <Checkout />}

      <main className="flex flex-col sm:items-start relative z-20">
        <div className="flex justify-between items-center mb-8">
          <Image
            className="object-cover w-32 max-w-xs"
            src="/dafam.png"
            alt="Content Image"
            width={500}
            height={300}
            priority
          />
          <Image
            className="object-cover w-8 max-w-xs"
            src="/artotel.png"
            alt="Content Image"
            width={500}
            height={500}
            priority
          />
        </div>

          <div className="text-2xl text-left sm:text-left text-foreground">
            SPECIAL ROAD TO
          </div>
          <div className="text-4xl text-left sm:text-left font-[family-name:var(--font-FFDinPro-Black)] text-foreground">
            14<sup>th</sup> ANNIVERSARY
          </div>
          <div className="text-5xl text-left sm:text-left font-[family-name:var(--font-FFDinPro-Black)] text-artotel">
            <p>WAR</p>
            <p>ROOM</p>
            <p>VOUCHER</p>
          </div>

          <div className="absolute top-64 left-0 ml-56 z-30">
            <Image
              className="object-cover w-24 max-w-xs"
              src="/price.png"
              alt="Floating Price"
              width={200}
              height={200}
              priority
            />
          </div>

          <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />

          {!isCheckoutVisible && hasMounted && curDate <= endDate && (
            <div className="flex items-center justify-center absolute top-80 mt-72 bottom-0 left-0 right-0">
              <div className="text-3xl text-white font-[family-name:var(--font-FFDinPro-Black)] text-center sm:text-center">
                <p className="engraved">
                  {countdown.days} days, {countdown.hours} : {countdown.minutes} : {countdown.seconds}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center absolute top-80 mt-80 bottom-0 left-0 right-0">
            <button className="text-lg text-background" onClick={() => setTermsModalOpen(true)}>
              <p>*Read our Terms & Conditions</p>
            </button>
          </div>
      </main>
    </div>
  );
}
