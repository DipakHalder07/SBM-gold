"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FootCta from "./FootCta";
import InnerFooter from "./inner/InnerFooter";
import { setLenis } from "@/lib/smoothScroll";

/**
 * The frame every page shares: header, footer, smooth scrolling and the
 * scroll-triggered reveals that drive the `.scroll_active` animations.
 */
export default function SiteLayout({
  children,
  variant = "home",
}: {
  children: React.ReactNode;
  variant?: "home" | "inner";
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
    });
    setLenis(lenis);
    lenis.on("scroll", () => ScrollTrigger.update());

    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Page heroes animate in on load, everything else as it scrolls into view
    const isHero = (el: Element) => el.matches(".hero--cont, .hero--cont-sp");
    const activeElements = gsap.utils.toArray<HTMLElement>(".scroll_active");
    const heroTimer = setTimeout(() => {
      activeElements.filter(isHero).forEach((el) => el.classList.add("active"));
    }, 120);
    activeElements
      .filter((el) => !isHero(el))
      .forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          onEnter: () => el.classList.add("active"),
          once: true,
        });
      });

    // Keep the header out of the way over the home page footer
    if (variant === "home") {
      ScrollTrigger.create({
        trigger: ".foot_cta",
        start: "top 80%",
        endTrigger: "#footer",
        end: "bottom bottom",
        toggleClass: { targets: ".header", className: "hide" },
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer1 = setTimeout(refresh, 600);
    const timer2 = setTimeout(refresh, 1500);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      setLenis(null);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [variant]);

  if (variant === "inner") {
    return (
      <>
        <SiteHeader />
        <main className="ip">{children}</main>
        <InnerFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <FootCta />
      <SiteFooter />
    </>
  );
}
