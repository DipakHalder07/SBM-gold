"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Mission from "@/components/sections/Mission";
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
              <h2 className="ttl">
                <span className="ttl--row">
                  <span className="row-01 anime-fade-lft">
                    Engineered for
                  </span>
                  <span className="row-02 anime-fade-lft delay1">
                    Indian Homes<span className="ttl-dot">.</span>
                  </span>
                </span>
              </h2>
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

          {/* MISSION SECTION */}
          <Mission />
        </div>

        <AboutIntro />
        <Strengths />
        <Quality />
        <ProductsSection />
        <Company />

        {/* HDPE PIPE AROUND THE EARTH */}
        <PipeEarth />

        <Partner />
        <Milestones />

    </SiteLayout>
  );
}
