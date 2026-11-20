"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteLayout from "@/components/SiteLayout";
import AboutIntro from "@/components/sections/AboutIntro";
import Strengths from "@/components/sections/Strengths";
import Quality from "@/components/sections/Quality";
import ProductsSection from "@/components/sections/ProductsSection";
import Company from "@/components/sections/Company";
import Partner from "@/components/sections/Partner";
import BlogSection from "@/components/sections/BlogSection";
import PipeEarth from "@/components/sections/PipeEarth";
import { scrollToHash } from "@/lib/smoothScroll";
import { INDIA_MAP } from "@/lib/indiaMap";

// The map is centred inside the 2077×1830 emblem box, so convert map units to box percentages
const [MAP_W, MAP_H] = INDIA_MAP.viewBox.split(" ").slice(2).map(Number);
const MAP_FRAC = (MAP_W / MAP_H) * (1830 / 2077);
const mapPos = (x: number, y: number) => ({
  left: `${((1 - MAP_FRAC) / 2 + (x / MAP_W) * MAP_FRAC) * 100}%`,
  top: `${(y / MAP_H) * 100}%`,
});
// the six pieces of the SBM GOLD mark, top to bottom; light pieces are the brand orange-red
const EMBLEM_PIECES = [
  { points: "773,194 1016,0 2077,763 1663,829", fill: "#EF4224" },
  { points: "768,199 1061,398 668,724 359,520", fill: "#941711" },
  { points: "354,514 1055,995 818,1189 254,802", fill: "#EF4224" },
  { points: "1293,641 1834,1023 1679,1343 1011,874", fill: "#941711" },
  { points: "0,1111 409,1028 1309,1642 1072,1830", fill: "#941711" },
  { points: "1414,1155 1685,1343 1315,1642 1022,1449", fill: "#EF4224" },
];

const PIN_FRAC = {
  x: (1 - MAP_FRAC) / 2 + (INDIA_MAP.siliguri[0] / MAP_W) * MAP_FRAC,
  y: INDIA_MAP.siliguri[1] / MAP_H,
};
const PIN_BOX = { x: PIN_FRAC.x * 2077, y: PIN_FRAC.y * 1830 };
const PIN_ORIGIN = `${PIN_FRAC.x * 100}% ${PIN_FRAC.y * 100}%`;

export default function Home() {
  const emblemContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Only phones get the video element, so larger screens never download it
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 47.9375em)");
    const sync = () => setShowVideo(phone.matches);
    sync();
    phone.addEventListener("change", sync);
    return () => phone.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [showVideo]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 3. GSAP SBM GOLD Emblem Sticky Zoom Animation & Header Hide
    const moveCont1 = document.querySelector(".emblem-line-red");
    const moveCont2 = document.querySelector(".emblem-line-blue");
    const scaleCont = document.querySelector(".home_emblem--sticky .imgarea");
    const colorCont = document.querySelector(".emblem-lg-color");
    const visibleCont = document.querySelector(".home_emblem--sticky .contarea");

    // Initialize outline parts at top-left and bottom-right corners
    if (moveCont1 && moveCont2) {
      gsap.set(moveCont1, { x: "-46vw", y: "-40vh", left: 0, top: 0, opacity: 0.7 });
      gsap.set(moveCont2, { x: "46vw", y: "40vh", left: 0, top: 0, opacity: 0.7 });
    }

    // Dedicated trigger to ensure header stays hidden throughout entire home_emblem section
    ScrollTrigger.create({
      trigger: ".home_emblem",
      start: "top 80%",
      end: "bottom top",
      toggleClass: { targets: ".header", className: "hide" },
    });

    const tlYmd = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_emblem--scrolltarget01",
        start: "top 80%",
        endTrigger: ".home_emblem--scrolltarget01",
        end: "center top",
        scrub: 0.5,
        toggleClass: { targets: ".header", className: "hide" },
      },
    });

    const mapCont = document.querySelector(".emblem-map");
    const mapRest = document.querySelector(".emblem-map--rest");
    const mapNe = document.querySelectorAll(".emblem-map--ne");
    const mapMarks = document.querySelectorAll(".emblem-map--pin, .emblem-map--pulse, .emblem-map--label");
    const pieces = gsap.utils.toArray<SVGPolygonElement>(".emblem-lg-color .emblem-piece");
    const shine = document.querySelector(".emblem-shine");

    if (mapCont && mapRest && mapNe.length > 0) {
      gsap.set(mapRest, { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 });
      gsap.set(mapNe, { opacity: 0 });
      gsap.set(mapMarks, { opacity: 0 });
      tlYmd
        // the outline traces itself, then India fills in
        .to(mapRest, { strokeDashoffset: 0, ease: "none", duration: 1.2 })
        .to(mapRest, { fillOpacity: 1, ease: "none", duration: 0.4 })
        // the northeast states light up one after another, then the head office pin and labels
        .to(mapNe, { opacity: 1, ease: "none", duration: 0.25, stagger: 0.12 })
        .to(mapMarks, { opacity: 1, ease: "none", duration: 0.3 })
        // hold the finished map for a moment before the logo takes over
        .to({}, { duration: 0.6 })
        // the map collapses into the Siliguri pin...
        .to(mapCont, { opacity: 0, scale: 0.15, transformOrigin: PIN_ORIGIN, ease: "power2.in", duration: 0.7 });
    }

    if (moveCont1 && moveCont2 && colorCont && pieces.length > 0 && scaleCont && visibleCont) {
      // ...and the logo bursts out of that same point: every piece starts on the pin, small and turned
      gsap.set(colorCont, { opacity: 1 });
      pieces.forEach((piece, i) => {
        const box = piece.getBBox();
        gsap.set(piece, {
          x: PIN_BOX.x - (box.x + box.width / 2),
          y: PIN_BOX.y - (box.y + box.height / 2),
          scale: 0,
          rotation: i % 2 ? 120 : -120,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
      });
      if (shine) gsap.set(shine, { x: -900 });

      tlYmd
        .to(pieces, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: "back.out(1.3)", duration: 0.9, stagger: 0.14 }, mapCont ? "-=0.25" : undefined)
        // the outlines sweep in from the corners and settle just off the pieces, like a shadow of the logo
        .to(moveCont1, { x: 0, y: 0, xPercent: -2.4, yPercent: -2.6, opacity: 1, ease: "power2.out", duration: 1 }, "<0.2")
        .to(moveCont2, { x: 0, y: 0, xPercent: 2.4, yPercent: 2.6, opacity: 1, ease: "power2.out", duration: 1 }, "<");
      // a band of light runs across the finished logo
      if (shine) tlYmd.to(shine, { x: 2600, ease: "power1.inOut", duration: 0.8 }, "-=0.2");
      tlYmd
        .to({}, { duration: 0.4 })
        // zoom into the centre of the light-red left piece (354,514 1055,995 818,1189 254,802)
        // so the screen fills with the same orange-red as the catch panel behind it
        .to(scaleCont, { scale: 35, transformOrigin: "30% 48%", ease: "power2.in", duration: 1 })
        .to(visibleCont, { opacity: 1, ease: "none", duration: 0.4 }, "-=0.3");
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SiteLayout>
        <div className="hero">
          <div className="hero--movie pos-rel">
            {/* Each screen size downloads one image; on phones it shows until the video starts */}
            <picture className="hero-picture">
              <source
                media="(max-width: 47.9375em)"
                srcSet="/images/sbm/hero-mobile-thumb.jpg"
                width="720"
                height="1280"
              />
              <img
                src="/images/sbm/hero-products.jpg"
                width="2560"
                height="1448"
                className="img-cover hero-photo"
                alt="SBM GOLD product range: uPVC windows, WPC door frame, HDPE and uPVC pipes, wall putty and water tanks"
                fetchPriority="high"
              />
            </picture>
            {showVideo && (
              <video
                ref={videoRef}
                className="img-cover hero-video"
                autoPlay
                muted
                loop
                playsInline
                width="720"
                height="1280"
                preload="auto"
              >
                <source src="/videos/hero-mobile.mp4" type="video/mp4" />
              </video>
            )}
          </div>

          <section className="hero--cont scroll_active">
            <div className="cont--inner">
              <h1 className="ttl">
                <span className="ttl--row">
                  <span className="row-01 anime-fade-lft">
                    Engineered for
                  </span>{" "}
                  <span className="row-02 anime-fade-lft">
                    Indian Homes<span className="ttl-dot">.</span>
                  </span>
                </span>
              </h1>
              <p className="txt anime-fade-up delay1 sp-none">
                Manufacturers of uPVC doors &amp; windows<br />
                profiles, WPC door frames, water tanks<br className="sp-none" />
                &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay2 sp-none">
                <Link href="#products" onClick={(e) => scrollToHash("#products", e)}>
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>
          </section>

          {/* SP Hero */}
          <div className="hero--cont-sp pc-none scroll_active">
            <div className="inner">
              <p className="txt anime-fade-up delay1">
                Manufacturers of uPVC doors &amp; windows profiles, WPC door frames, water tanks &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay2">
                <Link href="#products" onClick={(e) => scrollToHash("#products", e)}>
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>
          </div>

          {/* HDPE PIPE AROUND THE EARTH */}
          <PipeEarth />
        </div>

        <AboutIntro />
        <Strengths />
        <Quality />
        <ProductsSection />
        <Company />

        {/* SBM GOLD EMBLEM ZOOM ANIMATION SECTION */}
        <div className="home_emblem" ref={emblemContainerRef}>
          <div className="home_emblem--sticky">
            <div className="imgarea pos-rel">
              <svg
                className="emblem-lg-color new img-specif"
                viewBox="0 0 2077 1830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="emblem-shine-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="emblem-all-pieces">
                    {EMBLEM_PIECES.map((piece) => (
                      <polygon key={piece.points} points={piece.points} />
                    ))}
                  </clipPath>
                </defs>
                {EMBLEM_PIECES.map((piece) => (
                  <polygon key={piece.points} className="emblem-piece" points={piece.points} fill={piece.fill} />
                ))}
                <g clipPath="url(#emblem-all-pieces)">
                  <g transform="skewX(-20)">
                    <rect className="emblem-shine" x="-400" y="-200" width="420" height="2300" fill="url(#emblem-shine-grad)" />
                  </g>
                </g>
              </svg>

              <svg
                className="emblem-line-red img-specif"
                viewBox="0 0 2077 1830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.85" stroke="#EF4224" strokeWidth="4" strokeLinejoin="round">
                  <polygon points="773,194 1016,0 2077,763 1663,829" />
                  <polygon points="768,199 1061,398 668,724 359,520" />
                  <polygon points="354,514 1055,995 818,1189 254,802" />
                </g>
              </svg>

              <svg
                className="emblem-line-blue img-specif"
                viewBox="0 0 2077 1830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.85" stroke="#EF4224" strokeWidth="4" strokeLinejoin="round">
                  <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                </g>
              </svg>

              {/* India map shown first; it draws in, highlights the northeast, then hands over to the logo */}
              <div className="emblem-map">
                <svg
                  className="emblem-map--svg"
                  viewBox={INDIA_MAP.viewBox}
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-labelledby="emblem-map-title"
                >
                  <title id="emblem-map-title">
                    Map of India highlighting the northeast states, with SBM GOLD&apos;s head office in Siliguri
                  </title>
                  <path className="emblem-map--rest" d={INDIA_MAP.rest} pathLength={1} />
                  {INDIA_MAP.ne.map((state) => (
                    <path key={state.name} className="emblem-map--ne" d={state.d}>
                      <title>{state.name}</title>
                    </path>
                  ))}
                  <circle className="emblem-map--pulse" cx={INDIA_MAP.siliguri[0]} cy={INDIA_MAP.siliguri[1]} r="10" />
                  <circle className="emblem-map--pin" cx={INDIA_MAP.siliguri[0]} cy={INDIA_MAP.siliguri[1]} r="9" />
                </svg>
                <span className="emblem-map--label emblem-map--label-hq" style={mapPos(INDIA_MAP.siliguri[0], INDIA_MAP.siliguri[1] - 30)}>
                  Siliguri HQ
                </span>
                <span className="emblem-map--label emblem-map--label-ne" style={mapPos(690, 470)}>
                  Northeast India
                </span>
              </div>
            </div>

            <div className="contarea pos-rel">
              <div className="bg"></div>
              <div className="scroll-txt top">
                <div className="scroll-txt--cont flex flex-a-ctr">
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                </div>
              </div>
              <h3 className="catch font-en txt-ctr">
                <span className="txt-lg">GROW</span>&nbsp;WITH{" "}<br className="pc-none" />
                <span className="txt-lg">US</span>
              </h3>
              <div className="scroll-txt bottom">
                <div className="scroll-txt--cont reverse flex flex-a-ctr">
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/theme/images/top/recruit-txt.svg?v=4"
                    width="4594"
                    height="147"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="home_emblem--scrolltarget01"></div>
        </div>

        <Partner />
        <BlogSection />

    </SiteLayout>
  );
}
