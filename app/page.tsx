"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* =========================================================
   TIMELINE
========================================================= */

const sections = [
  { id: "hero", time: "07:30", label: "First Light" },
  { id: "morning", time: "09:15", label: "Ocean Morning" },
  { id: "golden", time: "17:45", label: "Golden Hour" },
  { id: "menu", time: "19:30", label: "The Table" },
  { id: "night", time: "21:00", label: "After Dark" },
];

/* =========================================================
   MENU
========================================================= */

const menuCategories = [
  {
    name: "Coffee",
    subtitle: "The classics",
    items: [
      {
        name: "Espresso",
        description: "Rich, bold, and simple.",
        price: "₱120",
      },
      {
        name: "Americano",
        description: "Espresso with hot water.",
        price: "₱140",
      },
      {
        name: "Café Latte",
        description: "Smooth espresso with steamed milk.",
        price: "₱160",
      },
      {
        name: "Cappuccino",
        description: "Espresso, steamed milk, and soft foam.",
        price: "₱165",
      },
    ],
  },
  {
    name: "Signature",
    subtitle: "Made our way",
    items: [
      {
        name: "Spanish Latte",
        description: "Sweet, creamy, and comforting.",
        price: "₱180",
      },
      {
        name: "Sea Salt Latte",
        description: "Creamy coffee with a gentle salty finish.",
        price: "₱190",
      },
      {
        name: "Honey Cinnamon",
        description: "Warm honey and cinnamon over espresso.",
        price: "₱185",
      },
      {
        name: "Iced Mocha",
        description: "Chocolate, espresso, and chilled milk.",
        price: "₱180",
      },
    ],
  },
  {
    name: "Bites",
    subtitle: "Something to share",
    items: [
      {
        name: "Butter Croissant",
        description: "Flaky, buttery, and freshly baked.",
        price: "₱135",
      },
      {
        name: "Chocolate Croissant",
        description: "Golden pastry with chocolate inside.",
        price: "₱155",
      },
      {
        name: "Café Burger",
        description: "A hearty burger made for slow evenings.",
        price: "₱250",
      },
      {
        name: "Crispy Fries",
        description: "Golden, crisp, and perfect for sharing.",
        price: "₱150",
      },
    ],
  },
];

/* =========================================================
   CAROUSEL TYPES
========================================================= */

type CarouselImage = {
  src: string;
  alt: string;
  label: string;
};

/* =========================================================
   PREMIUM IMAGE CAROUSEL
========================================================= */

function ImageCarousel({
  images,
  height,
  dark = false,
}: {
  images: CarouselImage[];
  height: string;
  dark?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);

  const next = () => {
    setCurrent((previous) => (previous + 1) % images.length);
  };

  const previous = () => {
    setCurrent(
      (previous) => (previous - 1 + images.length) % images.length
    );
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (touchStart.current === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStart.current = null;
  };

  const activeImage = images[current];

  return (
    <div
      className={`relative ${height} w-full overflow-hidden rounded-[2rem] ${
        dark ? "bg-[#050F1A]" : "bg-[#DED4C7]"
      } touch-pan-y`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* =====================================================
          AMBIENT BACKGROUND

          This fills the side spaces with a soft version
          of the CURRENT photograph.

          It does NOT change the actual image.
      ===================================================== */}

      {images.map((image, index) => (
        <div
          key={`background-${image.src}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current
              ? "opacity-100"
              : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center scale-110 blur-2xl"
          />

          <div
            className={`absolute inset-0 ${
              dark
                ? "bg-[#071A2B]/65"
                : "bg-[#F6E7D8]/55"
            }`}
          />
        </div>
      ))}

      {/* =====================================================
          AMBIENT LIGHT

          Gives the gallery a softer cinematic appearance.
      ===================================================== */}

      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-[radial-gradient(circle_at_center,transparent_15%,rgba(7,26,43,0.35)_75%,rgba(7,26,43,0.75)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_15%,rgba(246,231,216,0.25)_70%,rgba(246,231,216,0.65)_100%)]"
        }`}
      />

      {/* =====================================================
          ORIGINAL IMAGE

          IMPORTANT:

          object-contain means the ENTIRE image is preserved.

          There is:
          - NO object-cover
          - NO scale animation
          - NO zoom
          - NO cropping
      ===================================================== */}

      {images.map((image, index) => (
        <div
          key={`main-${image.src}`}
          className={`absolute inset-0 flex items-center justify-center p-3 sm:p-5 lg:p-7 transition-opacity duration-700 ease-in-out ${
            index === current
              ? "opacity-100"
              : "opacity-0"
          }`}
          aria-hidden={index !== current}
        >
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain object-center"
              priority={index === 0}
            />
          </div>
        </div>
      ))}

      {/* =====================================================
          SOFT IMAGE EDGE
      ===================================================== */}

      <div className="absolute inset-3 sm:inset-5 lg:inset-7 rounded-[1.25rem] border border-white/10 pointer-events-none" />

      {/* =====================================================
          TOP LEFT PHOTO NUMBER
      ===================================================== */}

      <div className="absolute left-5 top-5 sm:left-7 sm:top-7 z-20">

        <div className="flex items-center gap-3">

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/65">
            {String(current + 1).padStart(2, "0")}
          </span>

          <div className="h-px w-8 bg-white/25" />

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35">
            {String(images.length).padStart(2, "0")}
          </span>

        </div>

      </div>

      {/* =====================================================
          LABEL
      ===================================================== */}

      <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7 z-20">

        <div className="flex items-center gap-3">

          <div className="h-px w-6 bg-[#F4A261]" />

          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white/80 drop-shadow-lg">
            {activeImage.label}
          </span>

        </div>

      </div>

      {/* =====================================================
          ARROWS
      ===================================================== */}

      <div className="absolute right-5 bottom-5 sm:right-7 sm:bottom-7 z-20 flex items-center gap-2">

        <button
          type="button"
          onClick={previous}
          aria-label="Previous image"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-[#071A2B]"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-[#071A2B]"
        >
          →
        </button>

      </div>

      {/* =====================================================
          DOTS
      ===================================================== */}

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">

        {images.map((image, index) => (
          <button
            key={`dot-${image.src}`}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show image ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === current
                ? "w-7 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}

      </div>

    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [active, setActive] = useState("hero");

  const refs = useRef<Record<string, HTMLElement | null>>({});

  /* =======================================================
     SECTION OBSERVER
  ======================================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    Object.values(refs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#071A2B] text-[#F6E7D8]">

      {/* =====================================================
          TIME RAIL
      ===================================================== */}

      <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-7">

        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className="flex items-center gap-3 group text-left"
            aria-label={`Go to ${section.label}`}
          >

            <div
              className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                active === section.id
                  ? "bg-[#F4A261] scale-125 shadow-[0_0_18px_5px_rgba(244,162,97,0.45)]"
                  : "bg-white/20 group-hover:bg-white/50"
              }`}
            />

            <span
              className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-500 ${
                active === section.id
                  ? "opacity-100 text-[#F4A261]"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            >
              {section.time}
            </span>

          </button>
        ))}

      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="hero"
        ref={(element) => {
          refs.current.hero = element;
        }}
        className="relative min-h-screen w-full overflow-hidden"
      >

        {/* HERO IMAGE */}

        <Image
          src="/images/cafe-lights.jpg"
          alt="Warm lights at Magic Land Cafe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* HERO OVERLAYS */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#071A2B]/60 via-transparent to-[#071A2B]/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071A2B]/90 via-[#071A2B]/40 to-transparent" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,transparent_0%,transparent_42%,rgba(7,26,43,0.10)_70%,rgba(7,26,43,0.30)_100%)]" />

        {/* =================================================
            NAVBAR
        ================================================= */}

        <nav className="absolute top-0 left-0 right-0 z-40 px-5 sm:px-8 lg:px-12 pt-5">

          <div className="mx-auto max-w-7xl rounded-full border border-white/15 bg-[#071A2B]/15 px-4 sm:px-6 py-3 backdrop-blur-md">

            <div className="flex items-center justify-between gap-4">

              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="shrink-0 font-serif italic text-lg sm:text-xl text-[#F6E7D8]/90 transition-opacity hover:opacity-70"
              >
                Magic Land
              </button>

              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">

                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`shrink-0 rounded-full px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                      active === section.id
                        ? "bg-white/15 text-[#F4A261]"
                        : "text-[#F6E7D8]/65 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}

              </div>

            </div>

          </div>

        </nav>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div className="relative z-10 min-h-screen flex items-start">

          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-[30vh] sm:pt-[27vh] lg:pt-[25vh]">

            <div className="max-w-[430px] sm:max-w-[480px] lg:max-w-[510px]">

              <div className="flex items-center gap-4 mb-5">

                <div className="h-px w-9 sm:w-12 bg-[#F4A261]" />

                <span className="font-mono text-[#F4A261] text-[9px] sm:text-[10px] tracking-[0.28em] uppercase">
                  07:30 — First Light
                </span>

              </div>

              <h1 className="font-serif italic font-light text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.88] tracking-tight text-[#F6E7D8]/95 drop-shadow-[0_3px_18px_rgba(0,0,0,0.5)]">

                Where the

                <br />

                <span className="font-light text-[#F4A261]">
                  day begins.
                </span>

              </h1>

              <p className="mt-6 text-sm sm:text-base lg:text-lg font-light text-[#F6E7D8]/70 max-w-[430px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                Coffee, ocean air, mountain light, and a place to slow down.
                Follow the café from first light to the last glow of the evening.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">

                <button
                  type="button"
                  onClick={() => scrollToSection("morning")}
                  className="group flex items-center gap-4 rounded-full border border-[#F6E7D8]/25 bg-[#071A2B]/35 backdrop-blur-md px-6 py-3 text-sm text-[#F6E7D8] transition-all duration-500 hover:bg-[#F4A261] hover:text-[#071A2B]"
                >

                  Explore the day

                  <span className="transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>

                </button>

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F6E7D8]/45">
                  Cebu · Philippines
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM FADE */}

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#071A2B] to-transparent pointer-events-none" />

        {/* SCROLL INDICATOR */}

        <div className="absolute bottom-8 right-8 sm:right-16 flex flex-col items-center gap-2 text-[#F6E7D8]/50">

          <span className="font-mono text-[9px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>

          <div className="h-12 w-px bg-gradient-to-b from-[#F4A261] to-transparent" />

        </div>

      </section>

      {/* =====================================================
          MORNING
      ===================================================== */}

      <section
        id="morning"
        ref={(element) => {
          refs.current.morning = element;
        }}
        className="relative overflow-hidden bg-[#F6E7D8] text-[#071A2B]"
      >

        <div className="relative z-10 px-8 sm:px-16 lg:px-24 py-28 sm:py-32 max-w-7xl mx-auto">

          <div className="mb-14">

            <span className="font-mono text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
              09:15 — Ocean Morning
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] mt-5 max-w-3xl">
              Slow mornings.
              <br />
              <span className="italic text-[#087E8B]">
                Clear minds.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-[#071A2B]/60 leading-relaxed">
              Sunlight spills across the table. The first cup arrives warm.
              Outside, the world is still finding its rhythm.
            </p>

          </div>

          {/* MORNING GALLERY */}

          <div className="max-w-5xl">

            <p className="mb-4 font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/35">
              Stories from the café · swipe or use the arrows
            </p>

            <ImageCarousel
              height="h-[380px] sm:h-[480px] lg:h-[520px]"
              images={[
                {
                  src: "/images/cafe6.jpg",
                  alt: "Morning at the cafe",
                  label: "Ocean morning",
                },
                {
                  src: "/images/pathway-noon.jpg",
                  alt: "Pathway during the day",
                  label: "The path at noon",
                },
                {
                  src: "/images/cafe7.jpg",
                  alt: "Mountain view from the cafe",
                  label: "Mountain morning",
                },
                {
                  src: "/images/cafe-lights.jpg",
                  alt: "Cafe atmosphere",
                  label: "A quiet beginning",
                },
              ]}
            />

          </div>

          {/* MORNING INFO */}

          <div className="grid sm:grid-cols-2 gap-4 mt-6 max-w-2xl">

            <div className="rounded-2xl border border-[#071A2B]/10 bg-white/30 p-5">

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Atmosphere
              </span>

              <p className="mt-2 font-serif text-xl">
                Bright & warm
              </p>

            </div>

            <div className="rounded-2xl border border-[#071A2B]/10 bg-white/30 p-5">

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Best with
              </span>

              <p className="mt-2 font-serif text-xl">
                Your first cup
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          GOLDEN HOUR
      ===================================================== */}

      <section
        id="golden"
        ref={(element) => {
          refs.current.golden = element;
        }}
        className="relative overflow-hidden bg-[#E76F51] text-[#071A2B]"
      >

        <div className="relative z-10 px-8 sm:px-16 lg:px-24 py-28 sm:py-32 max-w-7xl mx-auto">

          <div className="max-w-3xl mb-14">

            <span className="font-mono text-[#071A2B]/60 text-[10px] tracking-[0.3em] uppercase">
              17:45 — Golden Hour
            </span>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.88] mt-5">

              When the sky
              <br />

              <span className="italic text-[#FFE8A3]">
                turns gold.
              </span>

            </h2>

            <p className="mt-8 max-w-xl text-[#071A2B]/70 leading-relaxed">
              The tables move outside. The mountains disappear into the
              horizon. Every drink catches a little piece of the setting sun.
            </p>

          </div>

          {/* SUNSET GALLERY */}

          <div className="max-w-5xl">

            <ImageCarousel
              height="h-[400px] sm:h-[500px] lg:h-[540px]"
              images={[
                {
                  src: "/images/pathway-sunset.jpg",
                  alt: "Pathway during sunset",
                  label: "The golden path",
                },
                {
                  src: "/images/sunset3.jpg",
                  alt: "Early sunset",
                  label: "Early sunset",
                },
                {
                  src: "/images/sunset5.jpg",
                  alt: "Sunset with clouds",
                  label: "Between the clouds",
                },
                {
                  src: "/images/sunset4.jpg",
                  alt: "Balcony overlooking sunset",
                  label: "From the balcony",
                },
                {
                  src: "/images/sunset2.jpg",
                  alt: "Light sunset",
                  label: "Dusk begins",
                },
                {
                  src: "/images/sunset1.jpg",
                  alt: "Almost dark sunset",
                  label: "Almost night",
                },
              ]}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          MENU
      ===================================================== */}

      <section
        id="menu"
        ref={(element) => {
          refs.current.menu = element;
        }}
        className="relative overflow-hidden bg-[#F6E7D8] text-[#071A2B] px-8 sm:px-16 lg:px-24 py-28 sm:py-32"
      >

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* MENU HEADER */}

          <div className="grid lg:grid-cols-2 gap-12 items-end">

            <div>

              <span className="font-mono text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
                19:30 — The Table
              </span>

              <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.85] mt-5">

                Come hungry.
                <br />

                <span className="italic text-[#E76F51]">
                  Stay awhile.
                </span>

              </h2>

            </div>

            <p className="max-w-md text-[#071A2B]/60 leading-relaxed lg:pb-2">
              From the first espresso to the last plate of the evening,
              everything is made for slow conversations, shared tables,
              and one more cup.
            </p>

          </div>

          {/* FEATURE FOOD */}

          <div className="grid md:grid-cols-3 gap-5 mt-16">

            {/* BURGER */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/burger.jpg"
                alt="Cafe burger"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                  From the kitchen
                </span>

                <h3 className="font-serif text-3xl text-white mt-2">
                  Café Burger
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱250
                </span>

              </div>

            </div>

            {/* FRIES */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe8.jpg"
                alt="Crispy fries"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                  For sharing
                </span>

                <h3 className="font-serif text-3xl text-white mt-2">
                  Crispy Fries
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱150
                </span>

              </div>

            </div>

            {/* MILK TEA */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe9.jpg"
                alt="Signature milk tea"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                  Cold & creamy
                </span>

                <h3 className="font-serif text-3xl text-white mt-2">
                  Signature Milk Tea
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱170
                </span>

              </div>

            </div>

          </div>

          {/* MENU LIST */}

          <div className="mt-24 space-y-20">

            {menuCategories.map((category) => (

              <div key={category.name}>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#071A2B]/15 pb-5">

                  <div>

                    <h3 className="font-serif text-4xl sm:text-5xl">
                      {category.name}
                    </h3>

                    <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#071A2B]/40 mt-2">
                      {category.subtitle}
                    </p>

                  </div>

                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#071A2B]/30">
                    Our selection
                  </span>

                </div>

                <div className="grid sm:grid-cols-2 gap-x-10">

                  {category.items.map((item) => (

                    <div
                      key={item.name}
                      className="group flex items-start justify-between gap-6 py-6 border-b border-[#071A2B]/10 transition-all duration-300 hover:px-3"
                    >

                      <div>

                        <h4 className="font-serif text-xl sm:text-2xl group-hover:text-[#E76F51] transition-colors duration-300">
                          {item.name}
                        </h4>

                        <p className="mt-2 text-sm text-[#071A2B]/50 max-w-sm leading-relaxed">
                          {item.description}
                        </p>

                      </div>

                      <span className="shrink-0 font-mono text-sm text-[#087E8B] pt-1">
                        {item.price}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

          {/* COUNTER */}

          <div className="grid lg:grid-cols-2 gap-8 items-center mt-24">

            <div className="relative h-[350px] sm:h-[430px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe12.jpg"
                alt="Cafe counter"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

            </div>

            <div className="lg:px-10">

              <span className="font-mono text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
                Behind the counter
              </span>

              <h3 className="font-serif text-5xl sm:text-6xl leading-[0.9] mt-5">

                Made with
                <br />

                <span className="italic text-[#E76F51]">
                  intention.
                </span>

              </h3>

              <p className="mt-7 text-[#071A2B]/60 max-w-md leading-relaxed">
                Every cup starts here. Warm lights, familiar faces, and the
                small rituals that make a café feel like somewhere you belong.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection("night")}
                className="mt-8 group flex items-center gap-3 rounded-full bg-[#071A2B] text-[#F6E7D8] px-6 py-3 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#F4A261] hover:text-[#071A2B]"
              >

                Continue into the night

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </div>

          {/* MENU NOTE */}

          <div className="mt-20 border-t border-[#071A2B]/10 pt-8">

            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#071A2B]/40">
              Prices are placeholders · Menu to be updated
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          AFTER DARK
      ===================================================== */}

      <section
        id="night"
        ref={(element) => {
          refs.current.night = element;
        }}
        className="relative overflow-hidden bg-[#071A2B] px-8 sm:px-16 lg:px-24 py-28 sm:py-32"
      >

        <div className="relative z-10 max-w-6xl mx-auto">

          <span className="font-mono text-[#F4A261] text-[10px] tracking-[0.3em] uppercase">
            21:00 — After Dark
          </span>

          <h2 className="font-serif italic text-5xl sm:text-6xl lg:text-8xl leading-[0.9] mt-5 max-w-4xl">

            The night stays
            <br />

            <span className="text-[#F4A261]">
              lit.
            </span>

          </h2>

          <p className="mt-8 text-[#F6E7D8]/55 max-w-lg leading-relaxed">
            When the sun disappears, the café changes character. Warm lights,
            late conversations, good food, and nowhere else you need to be.
          </p>

          {/* NIGHT GALLERY */}

          <div className="mt-16 max-w-5xl">

            <ImageCarousel
              height="h-[400px] sm:h-[500px] lg:h-[540px]"
              dark
              images={[
                {
                  src: "/images/cottagelights.jpg",
                  alt: "Cottage lights at night",
                  label: "Warm lights",
                },
                {
                  src: "/images/pathway-night.jpg",
                  alt: "Pathway at night",
                  label: "The path after dark",
                },
                {
                  src: "/images/nightcottage.jpg",
                  alt: "Cottage at night",
                  label: "Somewhere to stay",
                },
                {
                  src: "/images/cafe-lights.jpg",
                  alt: "Cafe lights at night",
                  label: "One more glow",
                },
              ]}
            />

          </div>

          {/* CLOSING */}

          <div className="mt-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-t border-white/10 pt-10">

            <div>

              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/30">
                One place · every hour
              </span>

              <p className="font-serif italic text-3xl sm:text-4xl mt-3 text-[#F6E7D8]">
                Stay a little longer.
              </p>

            </div>

            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="rounded-full border border-[#F4A261]/40 px-6 py-3 font-mono text-[10px] tracking-[0.2em] uppercase text-[#F4A261] transition-all duration-300 hover:bg-[#F4A261] hover:text-[#071A2B]"
            >
              Back to sunrise ↑
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#050F1A] border-t border-white/10 px-8 sm:px-16 lg:px-24 py-14">

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">

          <div>

            <span className="font-serif italic text-3xl text-[#F6E7D8]">
              Magic Land
            </span>

            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mt-3">
              Coffee · Ocean · Mountains · Moments
            </p>

          </div>

          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
            OPEN DAILY · 07:30 — 23:00
          </div>

        </div>

      </footer>

    </main>
  );
}