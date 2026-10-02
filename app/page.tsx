"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["58%", "Increase in pick up point use"],
  ["23%", "Decreased in customer phone calls"],
  ["27%", "Increase in pick up point use"],
  ["40%", "Decreased in customer phone calls"],
];

function Car() {
  return (
    <svg className="car" viewBox="0 0 300 620" aria-label="sports car" role="img">
      <ellipse cx="150" cy="560" rx="92" ry="22" fill="rgba(0,0,0,.22)" />
      <path d="M78 500C58 450 48 360 52 265c4-105 34-183 75-212 14-10 32-15 46-15s32 5 46 15c41 29 71 107 75 212 4 95-6 185-26 235-12 30-39 48-68 48h-8c-29 0-56-18-68-48Z" fill="#151515" stroke="#303030" strokeWidth="3" />
      <path d="M98 182c6-55 26-91 52-105 26 14 46 50 52 105 4 37-8 52-52 54-44-2-56-17-52-54Z" fill="#242424" stroke="#444" strokeWidth="2" />
      <path d="M105 365c4 42 19 61 45 64 26-3 41-22 45-64-18-15-72-15-90 0Z" fill="#242424" stroke="#444" strokeWidth="2" />
      <path d="M150 76v438" stroke="#67e8f9" strokeOpacity=".25" strokeWidth="3" />
      <path d="M82 230h-19v95h19M218 230h19v95h-19" stroke="#3b3b3b" strokeWidth="8" />
      <path d="M78 205c-13 4-18 19-12 31 8 8 22 4 30-8 5-9 0-26-18-23ZM222 205c13 4 18 19 12 31-8 8-22 4-30-8-5-9 0-26 18-23Z" fill="#9ef01a" />
      <path d="M84 470c-15-4-24 7-21 20 5 12 23 14 38 4 8-6 3-22-17-24ZM216 470c15-4 24 7 21 20-5 12-23 14-38 4-8-6-3-22 17-24Z" fill="#9ef01a" />
    </svg>
  );
}

export default function Page() {
  const section = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const cards = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", { opacity: 0, y: 28, stagger: 0.045, duration: 0.7, ease: "power3.out" });
      gsap.from(cards.current, { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, delay: 0.25, ease: "power2.out" });

      gsap.to(car.current, {
        x: () => window.innerWidth < 640 ? window.innerWidth * 0.72 : window.innerWidth * 0.68,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(trail.current, { scaleX: self.progress, transformOrigin: "left center" });
            letters.current.forEach((el, i) => {
              gsap.set(el, { opacity: self.progress > i / (letters.current.length - 0.8) ? 1 : 0.18 });
            });
          },
        },
      });

      gsap.to(cards.current, {
        y: -8,
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section ref={section} className="hero">
        <div className="road-wrap">
          <div className="road">
            <div ref={trail} className="trail" />
            <div className="lane" />
            <div ref={car} className="car-wrap"><Car /></div>
          </div>
        </div>

        <div className="hero-title">
          {Array.from("WELCOME ITZFIZZ").map((char, i) => (
            <span key={i} ref={(el) => { if (el) letters.current[i] = el; }}>
              {char === " " ? " " : char}
            </span>
          ))}
        </div>

        <div className="stats">
          {stats.map(([number, text], i) => (
            <div className="stat" key={number} ref={(el) => { if (el) cards.current[i] = el; }}>
              <strong>{number}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="scroll-hint">SCROLL TO EXPLORE <i /></div>
      </section>
      <section className="after" />
    </main>
  );
}