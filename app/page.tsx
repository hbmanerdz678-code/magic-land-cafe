"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", time: "07:30", label: "First Light" },
  { id: "morning", time: "09:15", label: "Ocean Morning" },
  { id: "golden", time: "17:45", label: "Golden Hour" },
  { id: "menu", time: "19:30", label: "The Table" },
  { id: "night", time: "21:00", label: "After Dark" },
];

const menuCategories = [
  {
    name: "Coffee",
    subtitle: "Slowly brewed. Always warm.",
    items: [
      {
        name: "Espresso",
        description: "Rich, bold, and beautifully simple.",
        price: "₱120",
      },
      {
        name: "Americano",
        description: "Espresso with hot water and a clean finish.",
        price: "₱140",
      },
      {
        name: "Café Latte",
        description: "Smooth espresso with silky steamed milk.",
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
    subtitle: "A little more interesting.",
    items: [
      {
        name: "Spanish Latte",
        description: "Espresso, creamy milk, and a touch of sweetness.",
        price: "₱180",
      },
      {
        name: "Sea Salt Latte",
        description: "Velvety coffee with a delicate salted cream.",
        price: "₱190",
      },
      {
        name: "Honey Cinnamon",
        description: "Warm espresso, honey, milk, and cinnamon.",
        price: "₱185",
      },
      {
        name: "Iced Mocha",
        description: "Cold espresso, chocolate, and creamy milk.",
        price: "₱180",
      },
    ],
  },
  {
    name: "Bites",
    subtitle: "Something for the table.",
    items: [
      {
        name: "Butter Croissant",
        description: "Golden, flaky, and baked fresh.",
        price: "₱135",
      },
      {
        name: "Chocolate Croissant",
        description: "Buttery pastry filled with dark chocolate.",
        price: "₱155",
      },
      {
        name: "Café Burger",
        description: "A hearty house burger made for slow evenings.",
        price: "₱250",
      },
      {
        name: "Crispy Fries",
        description: "Golden, crunchy, and perfect for sharing.",
        price: "₱150",
      },
    ],
  },
];

export default function Home() {
  const [active, setActive] = useState("hero");

  const refs = useRef<Record<string, HTMLElement | null>>({});

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

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#071A2B] text-[#F6E7D8] font-[Work_Sans]">

      {/* =====================================================
          TIME RAIL
      ===================================================== */}

      <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-7">

        {sections.map((section) => (
          <button
            key={section.id}
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
              className={`font-[IBM_Plex_Mono] text-[10px] tracking-[0.15em] uppercase transition-all duration-500 ${
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
        className="relative min-h-screen w-full flex items-end overflow-hidden"
      >

        <Image
          src="/images/cafe-lights.jpg"
          alt="Warm cafe lights"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#071A2B]/30 via-[#071A2B]/20 to-[#071A2B]" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071A2B]/80 via-transparent to-[#E76F51]/10" />

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#F4A261]/15 blur-[120px]" />

        <div className="absolute left-1/3 bottom-0 h-[300px] w-[600px] rounded-full bg-[#E76F51]/10 blur-[100px]" />

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#071A2B] to-transparent" />

        <div className="relative z-10 px-8 sm:px-16 lg:px-24 pb-20 sm:pb-24 max-w-6xl">

          <div className="mb-6 flex items-center gap-4">

            <div className="h-px w-12 bg-[#F4A261]" />

            <span className="font-[IBM_Plex_Mono] text-[#F4A261] text-[11px] tracking-[0.3em] uppercase">
              07:30 — First Light
            </span>

          </div>

          <h1 className="font-[Fraunces] italic text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.88] tracking-tight text-[#F6E7D8]">

            Where the

            <br />

            <span className="text-[#F4A261]">
              day
            </span>{" "}
            begins.

          </h1>

          <p className="mt-8 text-base sm:text-lg text-[#F6E7D8]/70 max-w-xl leading-relaxed">
            Coffee, ocean air, mountain light, and a place to slow down.
            Follow the café from first light to the last glow of the evening.
          </p>

          <div className="mt-10 flex items-center gap-6">

            <button
              onClick={() => scrollToSection("morning")}
              className="group flex items-center gap-4 rounded-full border border-[#F6E7D8]/20 bg-[#F6E7D8]/5 backdrop-blur-md px-6 py-3 text-sm transition-all duration-500 hover:bg-[#F4A261] hover:text-[#071A2B]"
            >
              Explore the day

              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>

            </button>

            <span className="hidden sm:block font-[IBM_Plex_Mono] text-[10px] tracking-[0.2em] uppercase text-[#F6E7D8]/40">
              Cebu · Philippines
            </span>

          </div>

        </div>

        <div className="absolute bottom-8 right-8 sm:right-16 flex flex-col items-center gap-2 text-[#F6E7D8]/40">

          <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase [writing-mode:vertical-rl]">
            Scroll
          </span>

          <div className="h-12 w-px bg-gradient-to-b from-[#F4A261] to-transparent" />

        </div>

      </section>


      {/* =====================================================
          MORNING / OCEAN
      ===================================================== */}

      <section
        id="morning"
        ref={(element) => {
          refs.current.morning = element;
        }}
        className="relative min-h-screen overflow-hidden bg-[#F6E7D8] text-[#071A2B]"
      >

        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#087E8B]/10 blur-[120px]" />

        <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

          <div className="relative min-h-[55vh] lg:min-h-screen overflow-hidden">

            <Image
              src="/images/cafe 4.jpg"
              alt="Morning cafe atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/40 via-transparent to-[#087E8B]/10" />

            <div className="absolute bottom-8 left-8 rounded-full border border-white/20 bg-[#071A2B]/30 backdrop-blur-md px-4 py-2">

              <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/80">
                Morning light
              </span>

            </div>

          </div>

          <div className="relative flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20">

            <span className="font-[IBM_Plex_Mono] text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
              09:15 — Ocean Morning
            </span>

            <h2 className="font-[Fraunces] text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mt-5">

              Slow mornings.

              <br />

              <span className="italic text-[#087E8B]">
                Clear minds.
              </span>

            </h2>

            <p className="mt-8 max-w-md text-[#071A2B]/65 leading-relaxed">
              Sunlight spills across the table. The first cup arrives warm.
              Outside, the world is still finding its rhythm.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-3 max-w-md">

              <div className="rounded-2xl border border-[#071A2B]/10 bg-white/30 p-5">

                <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                  Atmosphere
                </span>

                <p className="mt-2 font-[Fraunces] text-xl">
                  Quiet & warm
                </p>

              </div>

              <div className="rounded-2xl border border-[#071A2B]/10 bg-white/30 p-5">

                <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-[#071A2B]/40">
                  Best with
                </span>

                <p className="mt-2 font-[Fraunces] text-xl">
                  Your first cup
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GOLDEN HOUR / MOUNTAIN
      ===================================================== */}

      <section
        id="golden"
        ref={(element) => {
          refs.current.golden = element;
        }}
        className="relative min-h-screen overflow-hidden text-[#071A2B]"
      >

        <div className="absolute inset-0 bg-gradient-to-br from-[#F4A261] via-[#E76F51] to-[#40334E]" />

        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#FFE8A3]/25 blur-[100px]" />

        <div className="absolute left-0 bottom-0 h-[300px] w-[600px] bg-[#40334E]/20 blur-[100px]" />

        <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

          <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20 order-2 lg:order-1">

            <span className="font-[IBM_Plex_Mono] text-[#071A2B]/60 text-[10px] tracking-[0.3em] uppercase">
              17:45 — Golden Hour
            </span>

            <h2 className="font-[Fraunces] text-5xl sm:text-6xl lg:text-7xl leading-[0.9] mt-5">

              When the sky

              <br />

              <span className="italic text-[#FFE8A3]">
                turns gold.
              </span>

            </h2>

            <p className="mt-8 max-w-md text-[#071A2B]/70 leading-relaxed">
              The tables move outside. The mountains disappear into the
              horizon. Every drink catches a little piece of the setting sun.
            </p>

            <div className="mt-10 flex items-center gap-3">

              <div className="w-10 h-10 rounded-full border border-[#071A2B]/20 flex items-center justify-center">
                ☀
              </div>

              <span className="font-[IBM_Plex_Mono] text-[10px] tracking-[0.15em] uppercase">
                Golden hour ritual
              </span>

            </div>

          </div>

          <div className="relative min-h-[55vh] lg:min-h-screen order-1 lg:order-2 overflow-hidden">

            <Image
              src="/images/cafe 7.jpg"
              alt="Mountain view from the cafe"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#E76F51]/30" />

            <div className="absolute bottom-8 right-8 rounded-full border border-white/20 bg-[#071A2B]/30 backdrop-blur-md px-4 py-2">

              <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/80">
                Mountain view
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MENU / THE TABLE
      ===================================================== */}

      <section
        id="menu"
        ref={(element) => {
          refs.current.menu = element;
        }}
        className="relative overflow-hidden bg-[#F6E7D8] text-[#071A2B] px-8 sm:px-16 lg:px-24 py-28 sm:py-32"
      >

        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#087E8B]/10 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#F4A261]/10 blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Menu header */}

          <div className="grid lg:grid-cols-2 gap-12 items-end">

            <div>

              <span className="font-[IBM_Plex_Mono] text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
                19:30 — The Table
              </span>

              <h2 className="font-[Fraunces] text-6xl sm:text-7xl lg:text-8xl leading-[0.85] mt-5">

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


          {/* Visual food row */}

          <div className="grid md:grid-cols-3 gap-5 mt-16">

            {/* Burger */}

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

                <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/60">
                  From the kitchen
                </span>

                <h3 className="font-[Fraunces] text-3xl text-white mt-2">
                  Café Burger
                </h3>

                <span className="font-[IBM_Plex_Mono] text-sm text-[#F4A261] mt-2 block">
                  ₱250
                </span>

              </div>

            </div>


            {/* Fries */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe 8.jpg"
                alt="Crispy fries"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/60">
                  For sharing
                </span>

                <h3 className="font-[Fraunces] text-3xl text-white mt-2">
                  Crispy Fries
                </h3>

                <span className="font-[IBM_Plex_Mono] text-sm text-[#F4A261] mt-2 block">
                  ₱150
                </span>

              </div>

            </div>


            {/* Milk Tea */}

            <div className="group relative h-[360px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe 9.jpg"
                alt="Milk tea"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

              <div className="absolute left-6 bottom-6">

                <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/60">
                  Cold & creamy
                </span>

                <h3 className="font-[Fraunces] text-3xl text-white mt-2">
                  Signature Milk Tea
                </h3>

                <span className="font-[IBM_Plex_Mono] text-sm text-[#F4A261] mt-2 block">
                  ₱170
                </span>

              </div>

            </div>

          </div>


          {/* Menu categories */}

          <div className="mt-24 space-y-20">

            {menuCategories.map((category) => (

              <div key={category.name}>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#071A2B]/15 pb-5">

                  <div>

                    <h3 className="font-[Fraunces] text-4xl sm:text-5xl">
                      {category.name}
                    </h3>

                    <p className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.18em] uppercase text-[#071A2B]/40 mt-2">
                      {category.subtitle}
                    </p>

                  </div>

                  <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.18em] uppercase text-[#071A2B]/30">
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

                        <h4 className="font-[Fraunces] text-xl sm:text-2xl group-hover:text-[#E76F51] transition-colors duration-300">
                          {item.name}
                        </h4>

                        <p className="mt-2 text-sm text-[#071A2B]/50 max-w-sm leading-relaxed">
                          {item.description}
                        </p>

                      </div>

                      <span className="shrink-0 font-[IBM_Plex_Mono] text-sm text-[#087E8B] pt-1">
                        {item.price}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>


          {/* Counter ambiance */}

          <div className="grid lg:grid-cols-2 gap-8 items-center mt-24">

            <div className="relative h-[350px] sm:h-[430px] rounded-[2rem] overflow-hidden">

              <Image
                src="/images/cafe 12.jpg"
                alt="Cafe counter ambiance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

            </div>

            <div className="lg:px-10">

              <span className="font-[IBM_Plex_Mono] text-[#087E8B] text-[10px] tracking-[0.3em] uppercase">
                Behind the counter
              </span>

              <h3 className="font-[Fraunces] text-5xl sm:text-6xl leading-[0.9] mt-5">

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
                onClick={() => scrollToSection("night")}
                className="mt-8 group flex items-center gap-3 rounded-full bg-[#071A2B] text-[#F6E7D8] px-6 py-3 font-[IBM_Plex_Mono] text-[10px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#F4A261] hover:text-[#071A2B]"
              >
                Continue into the night

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </div>


          <div className="mt-20 border-t border-[#071A2B]/10 pt-8">

            <p className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.15em] uppercase text-[#071A2B]/40">
              Prices are placeholders · Menu to be updated
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          NIGHT
      ===================================================== */}

      <section
        id="night"
        ref={(element) => {
          refs.current.night = element;
        }}
        className="relative min-h-screen overflow-hidden bg-[#071A2B] px-8 sm:px-16 lg:px-24 py-24"
      >

        <div className="absolute top-20 right-10 h-[400px] w-[400px] rounded-full bg-[#40334E]/30 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-[#087E8B]/10 blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto">

          <span className="font-[IBM_Plex_Mono] text-[#F4A261] text-[10px] tracking-[0.3em] uppercase">
            21:00 — After Dark
          </span>

          <h2 className="font-[Fraunces] italic text-5xl sm:text-6xl lg:text-8xl leading-[0.9] mt-5 max-w-4xl">

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


          {/* Night gallery */}

          <div className="grid lg:grid-cols-5 gap-5 mt-16">

            {/* Cottage */}

            <div className="relative h-[350px] lg:h-[520px] lg:col-span-3 rounded-3xl overflow-hidden border border-white/10">

              <Image
                src="/images/cafe 11.jpg"
                alt="Cafe cottage at night"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/70 via-transparent to-transparent" />

              <span className="absolute bottom-6 left-6 font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/70">
                Night at the cottage
              </span>

            </div>


            {/* Cafe 6 */}

            <div className="relative h-[350px] lg:h-[520px] lg:col-span-2 rounded-3xl overflow-hidden border border-white/10">

              <Image
                src="/images/cafe6.jpg"
                alt="Cafe atmosphere at night"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/70 via-transparent to-transparent" />

              <span className="absolute bottom-6 left-6 font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/70">
                Late night atmosphere
              </span>

            </div>

          </div>


          {/* Smaller gallery */}

          <div className="grid sm:grid-cols-2 gap-5 mt-5">

            <div className="relative h-[300px] rounded-3xl overflow-hidden border border-white/10">

              <Image
                src="/images/cafe 3.jpg"
                alt="Cafe interior"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/70 via-transparent to-transparent" />

              <span className="absolute bottom-6 left-6 font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/70">
                Somewhere to stay
              </span>

            </div>


            <div className="relative h-[300px] rounded-3xl overflow-hidden border border-white/10">

              <Image
                src="/images/cafe4.jpg"
                alt="Cafe atmosphere"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/70 via-transparent to-transparent" />

              <span className="absolute bottom-6 left-6 font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/70">
                Slow moments
              </span>

            </div>

          </div>


          {/* Closing */}

          <div className="mt-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-t border-white/10 pt-10">

            <div>

              <span className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.25em] uppercase text-white/30">
                One place · every hour
              </span>

              <p className="font-[Fraunces] italic text-3xl sm:text-4xl mt-3 text-[#F6E7D8]">
                Stay a little longer.
              </p>

            </div>

            <button
              onClick={() => scrollToSection("hero")}
              className="rounded-full border border-[#F4A261]/40 px-6 py-3 font-[IBM_Plex_Mono] text-[10px] tracking-[0.2em] uppercase text-[#F4A261] transition-all duration-300 hover:bg-[#F4A261] hover:text-[#071A2B]"
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

            <span className="font-[Fraunces] italic text-3xl text-[#F6E7D8]">
              Our Café
            </span>

            <p className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/30 mt-3">
              Coffee · Ocean · Mountains · Moments
            </p>

          </div>

          <div className="font-[IBM_Plex_Mono] text-[9px] tracking-[0.2em] uppercase text-white/40">
            OPEN DAILY · 07:30 — 23:00
          </div>

        </div>

      </footer>

    </main>
  );
}