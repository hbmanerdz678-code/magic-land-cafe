"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";

/* =========================================================
   MAGIC LAND CAFE
   MAIN WEBSITE DATA
   ---------------------------------------------------------
   Edit the information below when you need to update
   products, prices, contact details, or navigation.
========================================================= */

/* =========================================================
   BUSINESS INFORMATION
========================================================= */

const business = {
  name: "Magic Land Cafe",
  tagline: "Where the day begins.",
  phone: "09759424937",
  email: "hbmanerdz678@gmail.com",
  location: "SALAMANCA, GINATILAN, CEBU",
  hours: "11:00 AM – 7:00 PM",

  facebookName: "The Magic Land Cafe",
  facebookUrl: "https://www.facebook.com/TheMagicLandCafe",

  tiktokName: "The Magic Land Cafe",
  // Replace this with the actual TikTok profile URL when available.
  tiktokUrl: "#",
};

/* =========================================================
   TIMELINE
========================================================= */

const sections = [
  { id: "hero", time: "07:30", label: "Home" },
  { id: "morning", time: "09:15", label: "Morning" },
  { id: "golden", time: "17:45", label: "Golden Hour" },
  { id: "products", time: "19:30", label: "Products" },
  { id: "night", time: "21:00", label: "After Dark" },
];

/* =========================================================
   COMPLETE MENU
========================================================= */

const menuCategories = [
  {
    name: "Snacks & Starters",
    subtitle: "Something to begin with",
    items: [
      {
        name: "Burger",
        description: "A satisfying café classic.",
        price: "₱89",
      },
      {
        name: "Fries",
        description:
          "Choose from Sour Cream, BBQ, Chili BBQ, or Cheese.",
        price: "₱80",
      },
      {
        name: "Balanghoy Puto",
        description: "A traditional local favorite.",
        price: "₱25",
      },
      {
        name: "3 pcs. Budbud",
        description: "Three pieces of soft, comforting budbud.",
        price: "₱50",
      },
      {
        name: "Pizza — Hawaiian",
        description: "Classic Hawaiian pizza.",
        price: "₱195",
      },
      {
        name: "Pizza — Ham & Cheese",
        description: "Ham and melted cheese on a warm pizza.",
        price: "₱190",
      },
    ],
  },

  {
    name: "Rice Meals",
    subtitle: "Comfort food for hungry days",
    items: [
      {
        name: "Ngohiong",
        description: "Crispy local favorite.",
        price: "₱99",
      },
      {
        name: "Lumpia",
        description: "Crispy and savory.",
        price: "₱120",
      },
      {
        name: "2pc Burgersteak",
        description: "Two pieces of burger steak.",
        price: "₱140",
      },
      {
        name: "Pork Sisig",
        description: "Savory Filipino-style pork sisig.",
        price: "₱150",
      },
      {
        name: "Breaded Pork Chop",
        description: "Crispy breaded pork chop.",
        price: "₱150",
      },
    ],
  },

  {
    name: "A La Carte",
    subtitle: "For sharing or making your own table",
    items: [
      {
        name: "Plain Rice Cup",
        description: "A simple serving of steamed rice.",
        price: "₱25",
      },
      {
        name: "Plain Rice Platter",
        description: "A larger serving of plain rice.",
        price: "₱85",
      },
      {
        name: "Squid Roll",
        description: "Savory squid roll.",
        price: "₱80",
      },
      {
        name: "Spicy Ramyun Soup",
        description: "Warm and spicy ramyun soup.",
        price: "₱170",
      },
      {
        name: "Pork Sisig Platter",
        description: "A generous platter of pork sisig.",
        price: "₱260",
      },
      {
        name: "Pork Sinigang",
        description: "Classic Filipino sour soup with pork.",
        price: "₱260",
      },
      {
        name: "Fish Sinigang",
        description: "Comforting Filipino-style fish sinigang.",
        price: "₱290",
      },
      {
        name: "Tinolang Manok",
        description: "Bisaya-style chicken tinola.",
        price: "₱450",
      },
      {
        name: "Chicken Wings",
        description:
          "Original, Buffalo, Teriyaki, Chili Sauce, Sweet Chili, Sweet & Sour, or BBQ.",
        price: "₱175",
      },
    ],
  },

  {
    name: "Iced / Hot Drinks",
    subtitle: "Coffee and chocolate favorites",
    items: [
      {
        name: "Caramel Latte",
        description: "Smooth latte with caramel.",
        price: "₱69",
      },
      {
        name: "Chocolate Latte",
        description: "Creamy coffee with chocolate.",
        price: "₱69",
      },
      {
        name: "Coffee Mocha",
        description: "Coffee and chocolate together.",
        price: "₱69",
      },
      {
        name: "Coffee Latte",
        description: "Smooth and creamy café latte.",
        price: "₱69",
      },
      {
        name: "Spanish Macchiato",
        description: "Rich and creamy Spanish-style coffee.",
        price: "₱69",
      },
      {
        name: "Black Coffee",
        description: "Simple, bold, and classic.",
        price: "₱60",
      },
      {
        name: "Choco",
        description: "Comforting chocolate drink.",
        price: "₱69",
      },
    ],
  },

  {
    name: "Milk Tea",
    subtitle: "Cold, creamy, and sweet",
    items: [
      {
        name: "Chocolate",
        description: "Chocolate milk tea.",
        price: "₱79",
      },
      {
        name: "Okinawa",
        description: "Classic Okinawa milk tea.",
        price: "₱79",
      },
      {
        name: "Wintermelon",
        description: "Sweet wintermelon milk tea.",
        price: "₱79",
      },
      {
        name: "Cookies n' Cream",
        description: "Creamy milk tea with cookies.",
        price: "₱79",
      },
    ],
  },

  {
    name: "Lemonade",
    subtitle: "Fresh and refreshing",
    items: [
      {
        name: "Blue Lemonade",
        description: "Cool and refreshing blue lemonade.",
        price: "₱75",
      },
      {
        name: "Fresh Lemonade",
        description: "Classic fresh lemonade.",
        price: "₱75",
      },
      {
        name: "Fruity Lemonade",
        description: "Sweet fruity lemonade.",
        price: "₱75",
      },
      {
        name: "Yakult Lemonade",
        description: "Refreshing lemonade with Yakult.",
        price: "₱85",
      },
    ],
  },

  {
    name: "Fruit Soda",
    subtitle: "Bright and bubbly",
    items: [
      {
        name: "Four Seasons",
        description: "Refreshing fruit soda.",
        price: "₱75",
      },
      {
        name: "Green Apple",
        description: "Crisp green apple soda.",
        price: "₱75",
      },
      {
        name: "Strawberry",
        description: "Sweet strawberry soda.",
        price: "₱75",
      },
    ],
  },

  {
    name: "Bottled Drinks",
    subtitle: "Cold drinks ready to go",
    items: [
      {
        name: "Mineral Water",
        description: "Refreshing bottled water.",
        price: "₱30",
      },
      {
        name: "Coke",
        description: "Classic Coca-Cola.",
        price: "₱30",
      },
      {
        name: "Sprite",
        description: "Crisp lemon-lime soda.",
        price: "₱30",
      },
      {
        name: "Royal",
        description: "Classic orange soda.",
        price: "₱30",
      },
      {
        name: "Mountain Dew",
        description: "Bold citrus soda.",
        price: "₱40",
      },
      {
        name: "Cali Sparkling",
        description: "Refreshing sparkling drink.",
        price: "₱65",
      },
    ],
  },

  {
    name: "Pitchers",
    subtitle: "Made for sharing",
    items: [
      {
        name: "Four Seasons Pitcher",
        description: "A refreshing pitcher for the table.",
        price: "₱150",
      },
      {
        name: "Lemon Iced Tea Pitcher",
        description: "Cool lemon iced tea for sharing.",
        price: "₱150",
      },
    ],
  },

  {
    name: "Alcoholic Drinks",
    subtitle: "For the evening",
    items: [
      {
        name: "Red Horse Beer",
        description: "Cold Red Horse beer.",
        price: "₱85",
      },
      {
        name: "San Mig Light",
        description: "San Miguel Light beer.",
        price: "₱75",
      },
      {
        name: "San Mig Apple",
        description: "San Miguel Apple beer.",
        price: "₱75",
      },
      {
        name: "Smirnoff Mule",
        description: "Refreshing Smirnoff Mule.",
        price: "₱85",
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

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
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
      {/* AMBIENT BACKGROUND */}

      {images.map((image, index) => (
        <div
          key={`background-${image.src}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
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

      {/* AMBIENT LIGHT */}

      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-[radial-gradient(circle_at_center,transparent_15%,rgba(7,26,43,0.35)_75%,rgba(7,26,43,0.75)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_15%,rgba(246,231,216,0.25)_70%,rgba(246,231,216,0.65)_100%)]"
        }`}
      />

      {/* ORIGINAL IMAGE — NO ZOOM */}

      {images.map((image, index) => (
        <div
          key={`main-${image.src}`}
          className={`absolute inset-0 flex items-center justify-center p-3 sm:p-5 lg:p-7 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
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

      {/* IMAGE EDGE */}

      <div className="absolute inset-3 sm:inset-5 lg:inset-7 rounded-[1.25rem] border border-white/10 pointer-events-none" />

      {/* PHOTO NUMBER */}

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

      {/* LABEL */}

      <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7 z-20">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-[#F4A261]" />

          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white/80 drop-shadow-lg">
            {activeImage.label}
          </span>
        </div>
      </div>

      {/* ARROWS */}

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

      {/* DOTS */}

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
   MENU CATEGORY COMPONENT
========================================================= */

function MenuCategory({
  category,
}: {
  category: (typeof menuCategories)[number];
}) {
  return (
    <div>
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
          {category.items.length} selections
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
        threshold: 0.35,
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
      block: "start",
    });
  };

  return (
    <main className="relative min-h-screen bg-[#071A2B] text-[#F6E7D8]">

      {/* =====================================================
          FIXED NAVBAR
      ===================================================== */}

      <nav
        className="fixed inset-x-0 top-0 z-[9999] px-3 sm:px-6 lg:px-10 pt-3 sm:pt-5 pointer-events-none"
        style={{ isolation: "isolate" }}
      >
        <div className="mx-auto max-w-7xl pointer-events-auto">

          <div className="rounded-[1.5rem] sm:rounded-full border border-white/15 bg-[#071A2B]/55 px-4 sm:px-6 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">

            <div className="flex items-center justify-between gap-3">

              {/* LOGO */}

              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="shrink-0 font-serif italic text-lg sm:text-xl text-[#F6E7D8]/95 transition-opacity duration-300 hover:opacity-70"
              >
                Magic Land
              </button>

              {/* DESKTOP / MOBILE NAV */}

              <div className="flex min-w-0 items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">

                <button
                  type="button"
                  onClick={() => scrollToSection("hero")}
                  className={`shrink-0 rounded-full px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    active === "hero"
                      ? "bg-white/15 text-[#F4A261]"
                      : "text-[#F6E7D8]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("products")}
                  className={`shrink-0 rounded-full px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    active === "products"
                      ? "bg-white/15 text-[#F4A261]"
                      : "text-[#F6E7D8]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Products
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className={`shrink-0 rounded-full px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    active === "about"
                      ? "bg-white/15 text-[#F4A261]"
                      : "text-[#F6E7D8]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={`shrink-0 rounded-full px-3 sm:px-4 py-2 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase transition-all duration-300 ${
                    active === "contact"
                      ? "bg-white/15 text-[#F4A261]"
                      : "text-[#F6E7D8]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Contact
                </button>

              </div>

            </div>

          </div>

        </div>
      </nav>

      {/* =====================================================
          TIME RAIL
      ===================================================== */}

      <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-7">

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

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cafe-lights.jpg"
            alt="Warm lights at Magic Land Cafe"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#071A2B]/60 via-transparent to-[#071A2B]/70 pointer-events-none" />

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#071A2B]/90 via-[#071A2B]/40 to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_68%_45%,transparent_0%,transparent_42%,rgba(7,26,43,0.10)_70%,rgba(7,26,43,0.30)_100%)] pointer-events-none" />

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
                Good food, refreshing drinks, and moments worth staying for.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">

                <button
                  type="button"
                  onClick={() => scrollToSection("products")}
                  className="group flex items-center gap-4 rounded-full border border-[#F6E7D8]/25 bg-[#071A2B]/35 backdrop-blur-md px-6 py-3 text-sm text-[#F6E7D8] transition-all duration-500 hover:bg-[#F4A261] hover:text-[#071A2B]"
                >
                  Explore our menu

                  <span className="transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </button>

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F6E7D8]/45">
                  Ginatilan · Cebu
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[2] h-40 bg-gradient-to-t from-[#071A2B] to-transparent pointer-events-none" />

        <div className="absolute bottom-8 right-8 sm:right-16 z-10 flex flex-col items-center gap-2 text-[#F6E7D8]/50">

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
              Sunlight spills across the table. The first drink arrives warm.
              Outside, the mountains and ocean give you another reason to slow
              down.
            </p>

          </div>

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
                Good food & company
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
          PRODUCTS / MENU
      ===================================================== */}

      <section
        id="products"
        ref={(element) => {
          refs.current.products = element;
        }}
        className="relative overflow-hidden bg-[#F6E7D8] text-[#071A2B] px-6 sm:px-12 lg:px-24 py-28 sm:py-32"
      >

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* HEADER */}

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
              From snacks and rice meals to coffee, milk tea, lemonade,
              fruit soda, pitchers, and evening drinks — explore everything
              available at Magic Land Cafe.
            </p>

          </div>

          {/* FEATURE FOOD */}

          <div className="grid md:grid-cols-3 gap-5 mt-16">

            {/* BURGER */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/burger.jpg"
                alt="Magic Land Cafe burger"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                  Snacks & starters
                </span>

                <h3 className="font-serif text-3xl text-white mt-2">
                  Burger
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱89
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
                  Fries
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱80
                </span>

              </div>

            </div>

            {/* MILK TEA */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe9.jpg"
                alt="Milk tea"
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
                  Milk Tea
                </h3>

                <span className="font-mono text-sm text-[#F4A261] mt-2 block">
                  ₱79
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              COMPLETE MENU
          ================================================= */}

          <div className="mt-24 space-y-20">

            {menuCategories.map((category) => (
              <MenuCategory
                key={category.name}
                category={category}
              />
            ))}

          </div>

          {/* MENU NOTE */}

          <div className="mt-20 border-t border-[#071A2B]/10 pt-8">

            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#071A2B]/40">
              Menu prices shown in Philippine Peso (₱)
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        ref={(element) => {
          refs.current.about = element;
        }}
        className="relative overflow-hidden bg-[#087E8B] text-[#F6E7D8] px-8 sm:px-16 lg:px-24 py-28 sm:py-32"
      >

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <span className="font-mono text-[#FFE8A3] text-[10px] tracking-[0.3em] uppercase">
                About Magic Land
              </span>

              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] mt-5">
                A place to
                <br />
                <span className="italic text-[#FFE8A3]">
                  slow down.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-[#F6E7D8]/70 leading-relaxed">
                Magic Land Cafe is a place for good food, refreshing drinks,
                coffee, conversations, and quiet moments surrounded by the
                beauty of Ginatilan, Cebu.
              </p>

              <p className="mt-5 max-w-xl text-[#F6E7D8]/60 leading-relaxed">
                Come for a drink, stay for the view, share a meal, and enjoy
                the day at your own pace.
              </p>

            </div>

            <div className="relative h-[400px] sm:h-[500px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe12.jpg"
                alt="Inside Magic Land Cafe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/50 to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                  Magic Land Cafe
                </span>

                <p className="font-serif italic text-3xl text-white mt-2">
                  Where the day begins.
                </p>

              </div>

            </div>

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
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        ref={(element) => {
          refs.current.contact = element;
        }}
        className="relative overflow-hidden bg-[#F6E7D8] text-[#071A2B] px-8 sm:px-16 lg:px-24 py-28 sm:py-32"
      >

        <div className="max-w-6xl mx-auto">

          <div className="max-w-3xl">

            <span className="font-mono text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
              Get in touch
            </span>

            <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-[0.85] mt-5">
              Come find
              <br />
              <span className="italic text-[#E76F51]">
                Magic Land.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-[#071A2B]/60 leading-relaxed">
              Have a question, want to visit, or simply want to know more?
              Reach out to us through any of the channels below.
            </p>

          </div>

          {/* CONTACT GRID */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">

            {/* PHONE */}

            <a
              href={`tel:${business.phone}`}
              className="group rounded-[1.5rem] border border-[#071A2B]/10 bg-white/30 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/60"
            >

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Phone
              </span>

              <h3 className="font-serif text-2xl mt-4 group-hover:text-[#E76F51] transition-colors">
                {business.phone}
              </h3>

              <p className="mt-3 text-sm text-[#071A2B]/50">
                Tap to call
              </p>

            </a>

            {/* EMAIL */}

            <a
              href={`mailto:${business.email}`}
              className="group rounded-[1.5rem] border border-[#071A2B]/10 bg-white/30 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/60"
            >

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Email
              </span>

              <h3 className="font-serif text-xl sm:text-2xl mt-4 break-all group-hover:text-[#E76F51] transition-colors">
                {business.email}
              </h3>

              <p className="mt-3 text-sm text-[#071A2B]/50">
                Send us a message
              </p>

            </a>

            {/* LOCATION */}

            <div className="rounded-[1.5rem] border border-[#071A2B]/10 bg-white/30 p-7">

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Location
              </span>

              <h3 className="font-serif text-2xl mt-4">
                Ginatilan, Cebu
              </h3>

              <p className="mt-3 text-sm text-[#071A2B]/50">
                {business.location}
              </p>

            </div>

            {/* HOURS */}

            <div className="rounded-[1.5rem] border border-[#071A2B]/10 bg-white/30 p-7">

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                Opening Hours
              </span>

              <h3 className="font-serif text-2xl mt-4">
                {business.hours}
              </h3>

              <p className="mt-3 text-sm text-[#071A2B]/50">
                Please check our social pages for special announcements.
              </p>

            </div>

            {/* FACEBOOK */}

            <a
              href={business.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.5rem] border border-[#071A2B]/10 bg-[#071A2B] text-[#F6E7D8] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#087E8B]"
            >

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                Facebook
              </span>

              <h3 className="font-serif text-2xl mt-4">
                {business.facebookName}
              </h3>

              <p className="mt-3 text-sm text-white/45">
                Visit our Facebook page →
              </p>

            </a>

            {/* TIKTOK */}

            <a
              href={business.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-[1.5rem] border border-[#071A2B]/10 p-7 transition-all duration-300 hover:-translate-y-1 ${
                business.tiktokUrl === "#"
                  ? "bg-white/20 cursor-default"
                  : "bg-white/30 hover:bg-white/60"
              }`}
              onClick={(event) => {
                if (business.tiktokUrl === "#") {
                  event.preventDefault();
                }
              }}
            >

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                TikTok
              </span>

              <h3 className="font-serif text-2xl mt-4">
                {business.tiktokName}
              </h3>

              <p className="mt-3 text-sm text-[#071A2B]/50">
                {business.tiktokUrl === "#"
                  ? "TikTok profile coming soon"
                  : "Visit our TikTok →"}
              </p>

            </a>

          </div>

          {/* FINAL CTA */}

          <div className="mt-16 rounded-[2rem] bg-[#071A2B] text-[#F6E7D8] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F4A261]">
                Magic Land Cafe
              </span>

              <h3 className="font-serif italic text-4xl sm:text-5xl mt-3">
                See you in Ginatilan.
              </h3>

            </div>

            <button
              type="button"
              onClick={() => scrollToSection("products")}
              className="shrink-0 rounded-full bg-[#F4A261] text-[#071A2B] px-7 py-4 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#F6E7D8]"
            >
              View the menu →
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#050F1A] border-t border-white/10 px-8 sm:px-16 lg:px-24 py-14">

        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">

            <div>

              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="font-serif italic text-3xl text-[#F6E7D8] hover:opacity-70 transition-opacity"
              >
                Magic Land
              </button>

              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mt-3">
                Coffee · Food · Drinks · Mountains · Moments
              </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-4">

              <button
                type="button"
                onClick={() => scrollToSection("hero")}
                className="text-left font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("products")}
                className="text-left font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                Products
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="text-left font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                About
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="text-left font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                Contact
              </button>

              <a
                href={business.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                Facebook
              </a>

              <a
                href={`mailto:${business.email}`}
                className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-[#F4A261] transition-colors"
              >
                Email
              </a>

            </div>

          </div>

          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">

            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
              {business.location}
            </div>

            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
              OPEN DAILY · {business.hours}
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}