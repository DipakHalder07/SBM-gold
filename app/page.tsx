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
import Milestones from "@/components/sections/Milestones";
import PipeEarth from "@/components/sections/PipeEarth";
import { scrollToHash } from "@/lib/smoothScroll";

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
    const redCont = document.querySelectorAll(".emblem-lg-color .red-parts");
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

    if (moveCont1 && moveCont2 && colorCont && redCont.length > 0 && scaleCont && visibleCont) {
      tlYmd
        .to(moveCont1, { x: 0, y: 0, opacity: 1, ease: "none" })
        .to(moveCont2, { x: 0, y: 0, opacity: 1, ease: "none" }, "<")
        .to(colorCont, { opacity: 1, ease: "none" })
        .to(redCont, { opacity: 1, ease: "none" })
        // zoom into the centre of the light-red left piece (354,514 1055,995 818,1189 254,802)
        // so the screen fills with the same orange-red as the catch panel behind it
        .to(scaleCont, { scale: 35, transformOrigin: "30% 48%", ease: "none" })
        .to(visibleCont, { opacity: 1, ease: "none" });
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
            <span className="deco deco-1 fill gray md reverse anime-diag-lft">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-2 fill wht xs reverse anime-diag-lft">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-3 stroke wht lg reverse anime-diag-lft delay1">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-4 fill blue sm reverse anime-diag-lft delay1">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>

            <div className="cont--inner">
              <h1 className="ttl">
                <span className="ttl--row">
                  <span className="row-01 anime-fade-lft">
                    Engineered for
                  </span>{" "}
                  <span className="row-02 anime-fade-lft delay1">
                    Indian Homes<span className="ttl-dot">.</span>
                  </span>
                </span>
              </h1>
              <p className="txt anime-fade-up delay2 sp-none">
                Manufacturers of uPVC doors &amp; windows<br />
                profiles, WPC door frames, water tanks<br className="sp-none" />
                &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay3 sp-none">
                <Link href="#products" onClick={(e) => scrollToHash("#products", e)}>
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>



            <span className="bg-deco pc-none">
              <svg
                className="bg-deco img-specif"
                width="88"
                height="134"
                viewBox="0 0 88 134"
                fill="none"
              >
                <path d="M88 0L0 133.583H88L88 0Z" fill="#F04934" />
              </svg>
            </span>
          </section>

          {/* SP Hero */}
          <div className="hero--cont-sp pc-none scroll_active">
            <div className="inner">
              <p className="txt anime-fade-up delay2">
                Manufacturers of uPVC doors &amp; windows profiles, WPC door frames, water tanks &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay3">
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
                <polygon
                  className="red-parts"
                  points="773,194 1016,0 2077,763 1663,829"
                  fill="#EF4224"
                />
                <polygon
                  points="768,199 1061,398 668,724 359,520"
                  fill="#941711"
                />
                <polygon
                  className="red-parts"
                  points="354,514 1055,995 818,1189 254,802"
                  fill="#EF4224"
                />
                <polygon
                  points="1293,641 1834,1023 1679,1343 1011,874"
                  fill="#941711"
                />
                <polygon
                  points="0,1111 409,1028 1309,1642 1072,1830"
                  fill="#941711"
                />
                <polygon
                  className="red-parts"
                  points="1414,1155 1685,1343 1315,1642 1022,1449"
                  fill="#EF4224"
                />
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

              {/* each logo piece shows its own photo; swap a photo by changing its href */}
              <svg
                className="emblem-lg-img"
                viewBox="0 0 2077 1830"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="SBM GOLD"
              >
                <defs>
                  <clipPath id="emblem-piece-1">
                    <polygon points="773,194 1016,0 2077,763 1663,829" />
                  </clipPath>
                  <clipPath id="emblem-piece-2">
                    <polygon points="768,199 1061,398 668,724 359,520" />
                  </clipPath>
                  <clipPath id="emblem-piece-3">
                    <polygon points="354,514 1055,995 818,1189 254,802" />
                  </clipPath>
                  <clipPath id="emblem-piece-4">
                    <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  </clipPath>
                  <clipPath id="emblem-piece-5">
                    <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  </clipPath>
                  <clipPath id="emblem-piece-6">
                    <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                  </clipPath>
                </defs>
                <image
                  href="/images/sbm/emblem-01.jpg?v=2"
                  x="773" y="0" width="1304" height="829"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-1)"
                />
                <image
                  href="/images/sbm/emblem-02.jpg"
                  x="359" y="199" width="702" height="525"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-2)"
                />
                <image
                  href="/images/sbm/emblem-03.jpg"
                  x="254" y="514" width="801" height="675"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-3)"
                />
                <image
                  href="/images/sbm/emblem-04.jpg"
                  x="1011" y="641" width="823" height="702"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-4)"
                />
                <image
                  href="/images/sbm/emblem-05.jpg"
                  x="0" y="1028" width="1309" height="802"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-5)"
                />
                <image
                  href="/images/sbm/emblem-06.jpg"
                  x="1022" y="1155" width="663" height="487"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#emblem-piece-6)"
                />
                {/* thin white seams between neighbouring photos */}
                <g fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round">
                  <polygon points="773,194 1016,0 2077,763 1663,829" />
                  <polygon points="768,199 1061,398 668,724 359,520" />
                  <polygon points="354,514 1055,995 818,1189 254,802" />
                  <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                </g>
              </svg>
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
        <Milestones />

    </SiteLayout>
  );
}
