"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

        <Partner />
        <BlogSection />

    </SiteLayout>
  );
}
