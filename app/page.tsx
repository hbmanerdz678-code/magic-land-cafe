"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", time: "07:30", label: "Doors Open" },
  { id: "morning", time: "09:15", label: "Morning Pour" },
  { id: "golden", time: "17:45", label: "Golden Hour" },
  { id: "night", time: "21:00", label: "After Dark" },
];

export default function Home() {
  const [active, setActive] = useState("hero");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    Object.values(refs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#10192B] font-[Work_Sans]">
      {/* Time rail — desktop only */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center gap-3 group">
            <div
              className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                active === s.id
                  ? "bg-[#E7A33E] shadow-[0_0_12px_3px_rgba(231,163,62,0.6)] scale-125"
                  : "bg-white/20"
              }`}
            />
            <span
              className={`font-[IBM_Plex_Mono] text-[11px] tracking-wide transition-opacity duration-500 ${
                active === s.id ? "opacity-100 text-[#E7A33E]" : "opacity-0"
              }`}
            >
              {s.time}
            </span>
          </div>
        ))}
      </div>

      {/* HERO */}
      <section
        id="hero"
        ref={(el) => {
          refs.current.hero = el;
        }}
        className="relative h-screen w-full flex items-end"
      >
        <Image
          src="/images/cafe-lights.jpg"
          alt="Cafe string lights at night"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#10192B] via-[#10192B]/40 to-[#10192B]/10" />

        <div className="relative z-10 px-8 sm:px-16 pb-20 max-w-2xl">
          <span className="font-[IBM_Plex_Mono] text-[#E7A33E] text-xs tracking-[0.2em] uppercase">
            07:30 — Doors Open
          </span>

          <h1 className="font-[Fraunces] italic text-6xl sm:text-7xl text-[#F5EEDF] mt-4 leading-[1.05]">
            One café,
            <br />
            every hour of the day.
          </h1>

          <p className="text-[#F5EEDF]/70 mt-6 text-lg max-w-md">
            From the first pour to the last string light — follow the day as it
            unfolds.
          </p>
        </div>
      </section>

      {/* MORNING */}
      <section
        id="morning"
        ref={(el) => {
          refs.current.morning = el;
        }}
        className="relative grid sm:grid-cols-2 min-h-[80vh] bg-[#F5EEDF]"
      >
        <div className="relative h-[50vh] sm:h-auto">
          <Image
            src="/images/cafe.jpg"
            alt="Morning coffee"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-8 sm:px-16 py-16">
          <span className="font-[IBM_Plex_Mono] text-[#C97064] text-xs tracking-[0.2em] uppercase">
            09:15 — Morning Pour
          </span>

          <h2 className="font-[Fraunces] text-4xl sm:text-5xl text-[#10192B] mt-4">
            Slow starts, done right.
          </h2>

          <p className="text-[#10192B]/70 mt-6 max-w-md leading-relaxed">
            Sunlight through the windows, the first grind of the day. Mornings
            here move at their own pace.
          </p>
        </div>
      </section>

      {/* GOLDEN HOUR */}
      <section
        id="golden"
        ref={(el) => {
          refs.current.golden = el;
        }}
        className="relative grid sm:grid-cols-2 min-h-[80vh] bg-[#C97064]"
      >
        <div className="flex flex-col justify-center px-8 sm:px-16 py-16 order-2 sm:order-1">
          <span className="font-[IBM_Plex_Mono] text-[#10192B] text-xs tracking-[0.2em] uppercase">
            17:45 — Golden Hour
          </span>

          <h2 className="font-[Fraunces] text-4xl sm:text-5xl text-[#F5EEDF] mt-4">
            The light turns amber.
          </h2>

          <p className="text-[#F5EEDF]/80 mt-6 max-w-md leading-relaxed">
            The patio fills up, drinks get cooler, and the day starts winding
            down into something warmer.
          </p>
        </div>

        <div className="relative h-[50vh] sm:h-auto order-1 sm:order-2">
          <Image
            src="/images/cafe2.jpg"
            alt="Golden hour at the cafe"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* AFTER DARK */}
      <section
        id="night"
        ref={(el) => {
          refs.current.night = el;
        }}
        className="relative min-h-[90vh] bg-[#10192B] px-8 sm:px-16 py-24"
      >
        <span className="font-[IBM_Plex_Mono] text-[#E7A33E] text-xs tracking-[0.2em] uppercase">
          21:00 — After Dark
        </span>

        <h2 className="font-[Fraunces] italic text-4xl sm:text-5xl text-[#F5EEDF] mt-4 max-w-lg">
          The night stays lit, long after the sun goes down.
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-16">
          <div className="relative h-72 sm:h-96 rounded-sm overflow-hidden">
            <Image
              src="/images/cafe5.jpg"
              alt="Cafe at night"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="relative h-72 sm:h-96 rounded-sm overflow-hidden">
            <Image
              src="/images/chicken.jpg"
              alt="Evening dish"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#10192B] border-t border-[#F5EEDF]/10 px-8 sm:px-16 py-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <span className="font-[Fraunces] italic text-2xl text-[#F5EEDF]">
          Our Café
        </span>

        <div className="font-[IBM_Plex_Mono] text-xs text-[#F5EEDF]/50 tracking-wide">
          OPEN DAILY · 07:30 — 23:00
        </div>
      </footer>
    </div>
  );
}