"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLElement>(null);
  const ymdContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith("#") && href !== "#no_link") {
      if (e) e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerH = window.innerWidth > 1080 ? 74 : 72;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { offset: -headerH, duration: 0.75 });
        } else {
          const top = targetEl.getBoundingClientRect().top + window.scrollY - headerH;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    } else if (href.startsWith("#no_link")) {
      if (e) e.preventDefault();
    } else {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof window !== "undefined") {
      (window as any).gsap = gsap;
      (window as any).ScrollTrigger = ScrollTrigger;
    }

    // Initialize Lenis for fast, responsive, buttery-smooth scrolling
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Header scroll state handler (synchronized with Lenis)
    let isHeaderSm = false;
    const updateHeaderScroll = (scrollYPos?: number) => {
      if (!headerRef.current) return;
      const scrollY = typeof scrollYPos === "number" ? scrollYPos : (window.scrollY || document.documentElement.scrollTop);
      const shouldBeSm = scrollY > 50;

      if (shouldBeSm !== isHeaderSm) {
        isHeaderSm = shouldBeSm;
        if (shouldBeSm) {
          headerRef.current.classList.add("header-sm", "header-sm-visible");
        } else {
          headerRef.current.classList.remove("header-sm", "header-sm-visible");
        }
      }
    };

    // Synchronize Lenis scroll with GSAP ScrollTrigger and Header updates
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      updateHeaderScroll(e.scroll);
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleWindowScroll = () => {
      updateHeaderScroll();
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    updateHeaderScroll();

    // 1. Hero entrance animation triggered on page load (same as live site e-ymd.com)
    const heroElements = document.querySelectorAll<HTMLElement>(".hero--cont, .hero--cont-sp");
    const heroTimer = setTimeout(() => {
      heroElements.forEach((el) => {
        el.classList.add("active");
      });
    }, 120);

    // 2. Scroll Active Elements for all other sections
    const activeElements = gsap.utils.toArray<HTMLElement>(".scroll_active");
    activeElements.forEach((el) => {
      if (el.classList.contains("hero--cont") || el.classList.contains("hero--cont-sp")) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        onEnter: () => el.classList.add("active"),
        once: true,
      });
    });

    // 3. GSAP SBM GOLD Emblem Sticky Zoom Animation & Header Hide
    const moveCont1 = document.querySelector(".ymd-line-red");
    const moveCont2 = document.querySelector(".ymd-line-blue");
    const scaleCont = document.querySelector(".home_ymd--sticky .imgarea");
    const colorCont = document.querySelector(".ymd-lg-color");
    const redCont = document.querySelectorAll(".ymd-lg-color .red-parts");
    const visibleCont = document.querySelector(".home_ymd--sticky .contarea");

    // Dedicated trigger to ensure header stays hidden throughout entire home_ymd section
    ScrollTrigger.create({
      trigger: ".home_ymd",
      start: "top 80%",
      end: "bottom top",
      toggleClass: { targets: ".header", className: "hide" },
    });

    // Dedicated trigger to ensure header stays hidden throughout footer CTA and footer
    ScrollTrigger.create({
      trigger: ".foot_cta",
      start: "top 80%",
      endTrigger: "#footer",
      end: "bottom bottom",
      toggleClass: { targets: ".header", className: "hide" },
    });

    const tlYmd = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_ymd--scrolltarget01",
        start: "top 80%",
        endTrigger: ".home_ymd--scrolltarget01",
        end: "center top",
        scrub: 0.5,
        toggleClass: { targets: ".header", className: "hide" },
      },
    });

    if (moveCont1 && moveCont2 && colorCont && redCont.length > 0 && scaleCont && visibleCont) {
      tlYmd
        .to(moveCont1, { left: 0, top: 0, ease: "none" })
        .to(moveCont2, { right: 0, bottom: 0, ease: "none" }, "<")
        .to(colorCont, { opacity: 1, ease: "none" })
        .to(redCont, { opacity: 1, ease: "none" })
        // zoom into the centre of the light-red left piece (354,514 1055,995 818,1189 254,802)
        // so the screen fills with the same orange-red as the catch panel behind it
        .to(scaleCont, { scale: 35, transformOrigin: "30% 48%", ease: "none" })
        .to(visibleCont, { opacity: 1, ease: "none" });
    }

    const refreshST = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshST);
    const timer1 = setTimeout(refreshST, 600);
    const timer2 = setTimeout(refreshST, 1500);

    return () => {
      clearTimeout(heroTimer);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("load", refreshST);
      clearTimeout(timer1);
      clearTimeout(timer2);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      {/* Header */}
      <header className={`header ${mobileMenuOpen ? "active" : ""}`} ref={headerRef}>
        <div className="inner flex flex-j-between flex-a-ctr">
          <h1 className="header--logo">
            <Link href="/">
              <img
                width="855"
                height="130"
                src="/images/logo/sbm-gold-logo-header.png"
                alt="SBM GOLD"
                fetchPriority="high"
              />
            </Link>
          </h1>

          {/* Mobile Hamburger Button */}
          <div
            className={`gnav_btn flex flex-j-ctr flex-a-ctr ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="gnav_btn--lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`gnav ${mobileMenuOpen ? "active" : ""}`}>
            <ul className="gnav--menu flex flex-j-ctr">
              <li className={`menu-item menu-item-has-children ${openSubmenus["ymd"] ? "active" : ""}`}>
                <a
                  href="#no_link"
                  className="gnav--link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu("ymd");
                  }}
                >
                  <span>About Us</span>
                </a>
                <div
                  className={`head_sub_nav--wrap ${openSubmenus["ymd"] ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#feature" className="gnav--link" onClick={(e) => handleNavClick("#feature", e)}>
                        <span>Our Strengths</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Colour Shades</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Certifications</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Warranty</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${openSubmenus["ymd"] ? "active" : ""}`}
                  onClick={() => toggleSubmenu("ymd")}
                ></span>
              </li>

              <li className={`menu-item menu-item-has-children ${openSubmenus["products"] ? "active" : ""}`}>
                <a
                  href="#no_link"
                  className="gnav--link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu("products");
                  }}
                >
                  <span>Products</span>
                </a>
                <div
                  className={`head_sub_nav--wrap ${openSubmenus["products"] ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>uPVC Windows &amp; Doors</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>WPC Door Frames</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>HDPE &amp; uPVC Pipes</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>Water Tanks</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>Wall Putty</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${openSubmenus["products"] ? "active" : ""}`}
                  onClick={() => toggleSubmenu("products")}
                ></span>
              </li>

              <li className="menu-item">
                <a
                  href="#news"
                  className="gnav--link"
                  onClick={(e) => handleNavClick("#news", e)}
                >
                  <span>Milestones</span>
                </a>
              </li>

              <li className={`menu-item menu-item-has-children ${openSubmenus["company"] ? "active" : ""}`}>
                <a
                  href="#no_link"
                  className="gnav--link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu("company");
                  }}
                >
                  <span>Company</span>
                </a>
                <div
                  className={`head_sub_nav--wrap ${openSubmenus["company"] ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#company" className="gnav--link" onClick={(e) => handleNavClick("#company", e)}>
                        <span>Overview</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#company" className="gnav--link" onClick={(e) => handleNavClick("#company", e)}>
                        <span>Our Journey</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#company" className="gnav--link" onClick={(e) => handleNavClick("#company", e)}>
                        <span>Sustainability</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${openSubmenus["company"] ? "active" : ""}`}
                  onClick={() => toggleSubmenu("company")}
                ></span>
              </li>

              <li className={`menu-item menu-item-has-children ${openSubmenus["recruit"] ? "active" : ""}`}>
                <a
                  href="#no_link"
                  className="gnav--link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu("recruit");
                  }}
                >
                  <span>Partner</span>
                </a>
                <div
                  className={`head_sub_nav--wrap ${openSubmenus["recruit"] ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Become a Partner</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Partner with SBM Gold</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Distributor Network</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="gnav--link" onClick={(e) => handleNavClick("#contact", e)}>
                        <span>Partner Inquiry</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${openSubmenus["recruit"] ? "active" : ""}`}
                  onClick={() => toggleSubmenu("recruit")}
                ></span>
              </li>

            </ul>

            <ul className="gnav--cta flex">
              <li className="gnav--contact cta_contact">
                <Link href="#contact" onClick={(e) => handleNavClick("#contact", e)}>
                  <svg
                    className="img-specif"
                    width="41"
                    height="32"
                    viewBox="0 0 41 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.75 32C3.65 32 2.70833 31.6083 1.925 30.825C1.14167 30.0417 0.75 29.1 0.75 28V4C0.75 2.9 1.14167 1.95833 1.925 1.175C2.70833 0.391667 3.65 0 4.75 0H36.75C37.85 0 38.7917 0.391667 39.575 1.175C40.3583 1.95833 40.75 2.9 40.75 4V28C40.75 29.1 40.3583 30.0417 39.575 30.825C38.7917 31.6083 37.85 32 36.75 32H4.75ZM20.75 18L4.75 8V28H36.75V8L20.75 18ZM20.75 14L36.75 4H4.75L20.75 14ZM4.75 8V4V28V8Z" />
                  </svg>
                  <span>CONTACT</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <div className="hero">
          <div className="hero--movie pos-rel">
            <img
              src="/images/sbm/hero.jpg"
              width="1920"
              height="1080"
              className="img-cover hero-photo"
              alt="Home fitted with SBM GOLD uPVC windows and doors"
              fetchPriority="high"
            />
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
                    From Pipes to
                  </span>
                  <span className="row-02 anime-fade-lft delay1">
                    <span className="txt-lg">
                      Profiles<span className="ttl-dot">.</span>
                    </span>
                  </span>
                </span>
                <img
                  src="/images/logo/sbm-gold-logo-header.png"
                  width="855"
                  height="130"
                  className="anime-fade-lft delay2 hero-icon-img"
                  alt="SBM GOLD"
                />
              </h2>
              <p className="txt anime-fade-up delay3 sp-none">
                Manufacturers of uPVC doors &amp; windows<br />
                profiles, WPC door frames, water tanks<br className="sp-none" />
                &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay3 sp-none">
                <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>

            {/* Marquee Ticker */}
            <div className="scroll-txt pos_rel">
              <div className="scroll-txt--cont flex flex-a-ctr">
                <img
                loading="lazy"
                decoding="async"
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Nothing is impossible."
                />
                <img
                loading="lazy"
                decoding="async"
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Nothing is impossible."
                />
                <img
                loading="lazy"
                decoding="async"
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Nothing is impossible."
                />
                <img
                loading="lazy"
                decoding="async"
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Nothing is impossible."
                />
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
              <p className="txt anime-fade-up delay3">
                Manufacturers of uPVC doors &amp; windows profiles, WPC door frames, water tanks &amp; pipes, crafted with German technology.
              </p>
              <div className="btn anime-fade-up delay3">
                <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>
                  <span>Explore Products</span>
                </Link>
              </div>
            </div>
          </div>

          {/* MISSION SECTION */}
          <section className="home_mission scroll_active">
            <div className="bg"></div>
            <div className="inner">
              <h4 className="sub-ttl anime-fade-up">OUR MISSION</h4>
              <h3 className="ttl ttl-02 txt-ctr anime-fade-up delay1">
                <span className="block">
                  &ldquo;Bringing nature&rsquo;s serenity&rdquo;<br />
                  straight to you with<br />
                  <span className="txt-lg">Doors</span> &amp; <span className="txt-lg">Windows</span>.
                </span>
              </h3>
              <div className="txt anime-fade-up delay2">
                <p>
                  Every big achievement starts with a small dream.<br />
                  <span className="bold">From a humble beginning at SBM Plaza, Jaigaon to a trusted name in building materials.</span><br />
                  From plumbing systems to modern living solutions, we keep evolving.<br className="pc-none" />
                  Building trust, innovation and durability for every home and business.<br className="pc-none" />
                  Not just products, but a legacy.
                </p>
              </div>
            </div>

            <span className="deco deco-1 fill blue xs anime-diag-rgt2 delay1">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-2 stroke blue lg anime-diag-rgt delay2">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-3 stroke blue lg anime-diag-rgt">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>
            <span className="deco deco-4 fill wht sm anime-diag-rgt2 delay1">
              <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
              </svg>
            </span>

            {/* Seamless Infinite Scrolling Gallery */}
            <div className="imgarea scroll-img">
              <div className="scroll-img--list flex">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="img pos-rel">
                    <img
                loading="lazy"
                decoding="async"
                      src={`/images/sbm/gallery-0${num}.jpg`}
                      width="640"
                      height="427"
                      className="img-cover"
                      alt=""
                    />
                  </div>
                ))}
                {/* Repetition for continuous loop */}
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={`dup-${num}`} className="img pos-rel">
                    <img
                loading="lazy"
                decoding="async"
                      src={`/images/sbm/gallery-0${num}.jpg`}
                      width="640"
                      height="427"
                      className="img-cover"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="home_about bg-primary-dark clr-wht pos-rel">
          <div className="ttl-en scroll_active">
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/top/about-ttl.svg"
              width="1124"
              height="149"
              className="anime-fade-lft img-specif"
              alt="Our Service"
            />
          </div>
          <div className="inner inner-md home_about--cont scroll_active">
            <div className="txtarea">
              <h2 className="ttl ttl-01 txt-lft">
                <span className="jp block">ABOUT US</span>
              </h2>
              <h3 className="ttl-01-sub font-en txt-ctr mgn-btm64">
                <span className="txt">ABOUT</span>
              </h3>
              <h3 className="catch font-en">
                From Pipes to Profiles.<br />
                A Legacy of Precision Extrusion.
              </h3>
              <p className="txt">
                Backed by SBM GOLD&rsquo;s legacy of quality and innovation, our uPVC doors and windows profiles offer world-class, custom solutions for Indian homes. Crafted with German technology and automated precision, they ensure all-weather durability and superior noise and heat insulation.
              </p>
              <div className="btn btn-wh">
                <Link href="#feature">Explore SBM GOLD</Link>
              </div>
            </div>

            <div className="contarea">
              <div className="contarea--row1 flex flex-j-ctr">
                <div className="cont--wrap cont-01 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale">
                  <span className="sub-ttl font-en">
                    10+ Years of<br />Extrusion Expertise
                  </span>
                  <h4 className="ttl font-en">EXPERIENCE</h4>
                  <span className="icon">
                    <img
                loading="lazy"
                decoding="async"
                      src="/wp/wp-content/themes/standard_sass/images/top/about-icn01.svg"
                      width="166"
                      height="176"
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div className="contarea--row2 flex flex-j-ctr">
                <div className="cont--wrap cont-02 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale delay1">
                  <span className="sub-ttl font-en">
                    22,000 MT<br />Yearly Capacity
                  </span>
                  <h4 className="ttl font-en">MANUFACTURING</h4>
                  <span className="icon">
                    <img
                loading="lazy"
                decoding="async"
                      src="/wp/wp-content/themes/standard_sass/images/top/about-icn02.svg"
                      width="176"
                      height="176"
                      alt=""
                    />
                  </span>
                </div>
                <div className="cont--wrap cont-03 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale delay2">
                  <span className="sub-ttl font-en">
                    ISO &amp; BIS<br />Certified
                  </span>
                  <h4 className="ttl font-en">QUALITY ASSURANCE</h4>
                  <span className="icon">
                    <img
                loading="lazy"
                decoding="async"
                      src="/wp/wp-content/themes/standard_sass/images/top/about-icn03.svg"
                      width="176"
                      height="176"
                      alt=""
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <span className="deco deco-1 stroke wht lg scroll_active anime-diag-rgt delay1">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-2 fill red xs scroll_active anime-diag-rgt2">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
        </section>

        {/* FEATURE SECTION */}
        <section id="feature" className="home_feature section_pdg scroll_active">
          <div className="inner inner-lg">
            <div className="ttlarea">
              <h2 className="ttl ttl-01 txt-ctr">
                <span className="jp block">OUR STRENGTHS</span>
              </h2>
              <h3 className="ttl-01-sub font-en txt-ctr">
                <span className="txt">FEATURE</span>
              </h3>
            </div>

            <div className="contarea">
              {/* Feature 01 */}
              <div className="cont--wrap cont-01 pos-rel flex">
                <div className="imgarea pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/feature-01.jpg"
                    width="800"
                    height="600"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl flex flex-a-ctr font-en">
                    <span className="num-decoration font-en flex flex-column flex-a-ctr">
                      <span className="txt">FEATURE</span>
                      <span className="num">01</span>
                    </span>
                    Profiles Designed to<br />European Standards
                  </h4>
                  <p className="txt">
                    Sleek aesthetics with robust engineering. Our multi-chambered profiles work with European hardware systems and come with advanced locking systems for enhanced security.
                  </p>
                </div>
                <span className="deco deco-1 stroke wht md reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="deco deco-2 fill red xs reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="dots-list pos-ab">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>

              {/* Feature 02 */}
              <div className="cont--wrap cont-02 pos-rel flex">
                <div className="imgarea pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/feature-02.jpg"
                    width="800"
                    height="600"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl flex flex-a-ctr font-en">
                    <span className="num-decoration font-en flex flex-column flex-a-ctr">
                      <span className="txt">FEATURE</span>
                      <span className="num">02</span>
                    </span>
                    Thermal Insulation for<br />Quieter, Cooler Homes
                  </h4>
                  <p className="txt">
                    Multi-chambered profiles give superior heat insulation and cut outdoor noise, keeping your rooms calm and comfortable through every season.
                  </p>
                </div>
                <span className="deco deco-1 stroke wht md reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="deco deco-2 fill red xs reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="dots-list pos-ab">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>

              {/* Feature 03 */}
              <div className="cont--wrap cont-03 pos-rel flex">
                <div className="imgarea pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/feature-03.jpg"
                    width="800"
                    height="600"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl flex flex-a-ctr font-en">
                    <span className="num-decoration font-en flex flex-column flex-a-ctr">
                      <span className="txt">FEATURE</span>
                      <span className="num">03</span>
                    </span>
                    Built for Every Indian<br />Climate Extreme
                  </h4>
                  <p className="txt">
                    Weather-sealed, termite-proof and low maintenance. Our profiles resist sun, rain and humidity for a long lifespan, backed by a 20 years warranty.
                  </p>
                  <div className="btn">
                    <Link href="#quality">Learn About Quality Control</Link>
                  </div>
                </div>
                <span className="deco deco-1 stroke wht md reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="deco deco-2 fill red xs reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="dots-list pos-ab">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>

              {/* Feature 04 */}
              <div className="cont--wrap cont-04 pos-rel flex">
                <div className="imgarea pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/feature-04.jpg"
                    width="800"
                    height="600"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl flex flex-a-ctr font-en">
                    <span className="num-decoration font-en flex flex-column flex-a-ctr">
                      <span className="txt">FEATURE</span>
                      <span className="num">04</span>
                    </span>
                    Your All-in-One Solution,<br />From Profile to Installation
                  </h4>
                  <p className="txt">
                    End-to-end expertise with customizable styles and finishes, professional installation by our own team and reliable after-sales support.
                  </p>
                  <div className="btn">
                    <Link href="#products">Explore Our Range</Link>
                  </div>
                </div>
                <span className="deco deco-1 stroke wht md reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="deco deco-2 fill red xs reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="dots-list pos-ab">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>

              {/* Feature 05 */}
              <div className="cont--wrap cont-05 pos-rel flex">
                <div className="imgarea pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/feature-05.jpg"
                    width="800"
                    height="600"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl flex flex-a-ctr font-en">
                    <span className="num-decoration font-en flex flex-column flex-a-ctr">
                      <span className="txt">FEATURE</span>
                      <span className="num">05</span>
                    </span>
                    Trusted by Builders,<br />Backed by Industry Veterans
                  </h4>
                  <p className="txt">
                    With 10+ years of extrusion expertise, SBM GOLD is a trusted name for builders and homeowners. Our eco-friendly, recyclable uPVC is made to last.
                  </p>
                  <div className="btn">
                    <Link href="#contact">Talk to Our Team</Link>
                  </div>
                </div>
                <span className="deco deco-1 stroke wht md reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="deco deco-2 fill red xs reverse">
                  <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
                    <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
                  </svg>
                </span>
                <span className="dots-list pos-ab">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* QUALITY SECTION */}
        <section id="quality" className="home_quality scroll_active">
          <span className="deco deco-1 stroke blue lg reverse anime-diag-lft">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-2 fill blue xs reverse anime-diag-lft2 delay1">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>

          <div className="inner inner-md">
            <div className="ttlarea">
              <h2 className="ttl ttl-01 txt-ctr">
                <span className="jp block">QUALITY CONTROL</span>
              </h2>
              <h3 className="ttl-01-sub font-en txt-ctr">
                <span className="txt">QUALITY MANAGEMENT</span>
              </h3>
            </div>

            <div className="contarea">
              <div className="cont--wrap cont-01 pos-rel">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/quality-01.jpg"
                    width="700"
                    height="480"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">ISO Certified Manufacturing</h4>
                  <p className="txt">
                    Certified to ISO 9001:2015 and ISO 4427. Every profile is extruded with German technology and automated precision for consistent, world-class quality.
                  </p>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-02 pos-rel">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/quality-02.jpg"
                    width="700"
                    height="220"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">Colour Shades</h4>
                  <p className="txt">White, Oak Wood, Walnut, Black and Grey finishes to match every home.</p>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-03">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/quality-03.jpg"
                    width="700"
                    height="220"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">20 Years Warranty</h4>
                  <p className="txt">Long-lasting profiles backed by reliable after-sales support.</p>
                  <span className="circle"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="home_products scroll_active">
          <span className="deco deco-1 stroke red lg reverse anime-diag-lft">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-2 fill gray xs reverse anime-diag-lft2 delay1">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-3 fill red xs reverse anime-diag-lft2 delay1">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-4 stroke wht lg reverse anime-diag-lft delay2">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>

          <div className="ttl-en">
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/top/products-ttl.svg"
              width="867"
              height="139"
              className="anime-fade-lft img-specif"
              alt="Products"
            />
          </div>

          <div className="inner inner-md">
            <div className="ttlarea">
              <h2 className="ttl ttl-01 txt-lft">
                <span className="jp block">OUR PRODUCTS</span>
              </h2>
              <h3 className="ttl-01-sub font-en">
                <span className="txt">PRODUCTS</span>
              </h3>
            </div>

            <div className="contarea">
              <div className="cont--wrap cont-01 pos-rel">
                <span className="num font-en">01</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-01.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD uPVC windows"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    uPVC Windows &amp; Doors
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    Sliding, casement, tilt &amp; turn and villa windows, plus slide &amp; fold, sliding and internal doors, built on our Sliding, Casement and Accessories profile series.
                  </div>
                </div>
              </div>
              <div className="cont--wrap cont-02 pos-rel">
                <span className="num font-en">02</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-02.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD WPC door frame"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    WPC Door Frames
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    100% waterproof and termite-proof Wood Plastic Composite frames, ready to install and paint. Sizes 5&times;2.5, 4&times;2.5 and 3&times;2 inches.
                  </div>
                </div>
              </div>
              <div className="cont--wrap cont-03 pos-rel">
                <span className="num font-en">03</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-hdpe-pipes.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD HDPE pipes"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    HDPE Pipes
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    Resilient, reliable and leak-free HDPE pipes from 20mm to 630mm (IS:4984), with butt-welded seamless joints for water supply, industry and infrastructure.
                  </div>
                </div>
              </div>
              <div className="cont--wrap cont-01 pos-rel">
                <span className="num font-en">04</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-upvc-pipes.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD uPVC pipes"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    uPVC &amp; Agri Pipes
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    High-pressure solvent weld plumbing (IS:4985), MCGM approved for potable water and 40&ndash;50% cheaper than G.I. Plus agri, boring and drip irrigation pipes.
                  </div>
                </div>
              </div>
              <div className="cont--wrap cont-02 pos-rel">
                <span className="num font-en">05</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-water-tank.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD water tanks in green, blue, black and white"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    Water Tanks
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    Roto-moulded, food-grade, UV-resistant and anti-bacterial tanks from 100L to 10,000L in 2, 3 and 4 layers. Green, blue, black and white.
                  </div>
                </div>
              </div>
              <div className="cont--wrap cont-03 pos-rel">
                <span className="num font-en">06</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/product-wall-putty.jpg"
                    width="398"
                    height="266"
                    alt="SBM GOLD wall putty bags"
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    Wall Putty
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    White cement based putty for interior and exterior walls: a smooth, refined finish with excellent spread and adhesion. From rough to refined.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPANY SECTION */}
        <section id="company" className="home_company scroll_active">
          <div className="ttl-en">
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/top/company-ttl.svg"
              width="926"
              height="170"
              className="anime-fade-rgt img-specif"
              alt="Company"
            />
          </div>

          <div className="contarea">
            <div className="cont--row row-1">
              <div className="cont--wrap cont-01">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/company-01.jpg"
                    width="597"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h3 className="ttl font-en">Our Journey</h3>
                  <h4 className="sub-ttl font-en">SINCE 2014</h4>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-02">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/company-02.jpg"
                    width="597"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h3 className="ttl font-en">Company Overview</h3>
                  <h4 className="sub-ttl font-en">ABOUT</h4>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-03">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/company-03.jpg"
                    width="597"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h3 className="ttl font-en">Sustainability</h3>
                  <h4 className="sub-ttl font-en">SUSTAINABILITY</h4>
                  <span className="circle"></span>
                </div>
              </div>
            </div>

            <div className="cont--row">
              <div className="cont--wrap cont-04">
                <Link href="#news" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                loading="lazy"
                decoding="async"
                    src="/images/sbm/company-04.jpg"
                    width="1792"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <div className="ttlarea">
                    <h3 className="ttl font-en">Growth &amp; Excellence</h3>
                    <h4 className="sub-ttl font-en">DREAMS · DEDICATION · GROWTH</h4>
                  </div>
                  <p className="txt">
                    From our first land in Fulbari, Siliguri to North East India&rsquo;s first 450mm HDPE pipes and our new uPVC profiles line. Today: a 2,25,000 sq ft factory, 22,000 MT installed capacity and 300+ dealers. Yahi Hai #AsliCommitment.
                  </p>
                  <span className="circle"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SBM GOLD EMBLEM ZOOM ANIMATION SECTION */}
        <div className="home_ymd" ref={ymdContainerRef}>
          <div className="home_ymd--sticky">
            <div className="imgarea pos-rel">
              <svg
                className="ymd-lg-color new img-specif"
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
                className="ymd-line-red img-specif"
                viewBox="0 0 2077 1830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" stroke="#EF4224" strokeWidth="4" strokeLinejoin="round">
                  <polygon points="773,194 1016,0 2077,763 1663,829" />
                  <polygon points="768,199 1061,398 668,724 359,520" />
                  <polygon points="354,514 1055,995 818,1189 254,802" />
                  <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                </g>
              </svg>

              <svg
                className="ymd-line-blue img-specif"
                viewBox="0 0 2077 1830"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" stroke="#951F17" strokeWidth="4" strokeLinejoin="round">
                  <polygon points="773,194 1016,0 2077,763 1663,829" />
                  <polygon points="768,199 1061,398 668,724 359,520" />
                  <polygon points="354,514 1055,995 818,1189 254,802" />
                  <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                </g>
              </svg>

              {/* each logo piece shows its own photo; swap a photo by changing its href */}
              <svg
                className="ymd-lg-img"
                viewBox="0 0 2077 1830"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="SBM GOLD"
              >
                <defs>
                  <clipPath id="ymd-piece-1">
                    <polygon points="773,194 1016,0 2077,763 1663,829" />
                  </clipPath>
                  <clipPath id="ymd-piece-2">
                    <polygon points="768,199 1061,398 668,724 359,520" />
                  </clipPath>
                  <clipPath id="ymd-piece-3">
                    <polygon points="354,514 1055,995 818,1189 254,802" />
                  </clipPath>
                  <clipPath id="ymd-piece-4">
                    <polygon points="1293,641 1834,1023 1679,1343 1011,874" />
                  </clipPath>
                  <clipPath id="ymd-piece-5">
                    <polygon points="0,1111 409,1028 1309,1642 1072,1830" />
                  </clipPath>
                  <clipPath id="ymd-piece-6">
                    <polygon points="1414,1155 1685,1343 1315,1642 1022,1449" />
                  </clipPath>
                </defs>
                <image
                  href="/images/sbm/emblem-01.jpg?v=2"
                  x="773" y="0" width="1304" height="829"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-1)"
                />
                <image
                  href="/images/sbm/emblem-02.jpg"
                  x="359" y="199" width="702" height="525"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-2)"
                />
                <image
                  href="/images/sbm/emblem-03.jpg"
                  x="254" y="514" width="801" height="675"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-3)"
                />
                <image
                  href="/images/sbm/emblem-04.jpg"
                  x="1011" y="641" width="823" height="702"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-4)"
                />
                <image
                  href="/images/sbm/emblem-05.jpg"
                  x="0" y="1028" width="1309" height="802"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-5)"
                />
                <image
                  href="/images/sbm/emblem-06.jpg"
                  x="1022" y="1155" width="663" height="487"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#ymd-piece-6)"
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
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                </div>
              </div>
              <h3 className="catch font-en txt-ctr">
                <span className="txt-lg">BUILDING</span>&nbsp;A{" "}<br className="pc-none" />
                <span className="txt-lg">LEGACY</span>
              </h3>
              <div className="scroll-txt bottom">
                <div className="scroll-txt--cont reverse flex flex-a-ctr">
                  <img
                loading="lazy"
                decoding="async"
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                loading="lazy"
                decoding="async"
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="home_ymd--scrolltarget01"></div>
        </div>

        {/* BECOME A PARTNER SECTION */}
        <section id="recruit" className="home_recruit pos-rel scroll_active">
          <span id="partner" className="pos-abs" style={{ top: "-100px" }}></span>
          <span className="deco deco-1 fill wht xs reverse anime-diag-lft2">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-2 stroke wht lg anime-diag-rgt delay1">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>
          <span className="deco deco-3 fill blue xs anime-diag-rgt2 delay2">
            <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
              <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
            </svg>
          </span>

          <div className="inner inner-xl flex flex-a-ctr flex-j-between flex-sp-block">
            <div className="txtarea">
              <h2 className="ttl ttl-01 txt-lft">
                <span className="jp block">BECOME A PARTNER</span>
              </h2>
              <h3 className="ttl-01-sub font-en">
                <span className="txt">PARTNER WITH SBM GOLD</span>
              </h3>
              <div className="txt">
                <p>
                  Partner with SBM Gold in India &mdash; Join Eastern India&rsquo;s most trusted manufacturing network for uPVC doors &amp; windows, WPC door frames, HDPE pipes, water tanks, and wall putty.
                </p>
                <p>
                  As an authorized distributor, dealer, or project partner, scale your business with high-margin product lines, ISO &amp; ISI certified reliability, state-of-the-art extrusion, and dedicated technical &amp; marketing support.
                </p>
              </div>
              <div className="btn btn-wh">
                <Link href="#contact" onClick={(e) => handleNavClick("#contact", e)}>Become a Partner</Link>
              </div>
            </div>
            <div className="imgarea">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/partner-img.webp?v=2"
                width="808"
                height="800"
                alt="Partner with SBM Gold in India"
              />
            </div>
          </div>

          <div className="recruit--scroll scroll-img">
            <div className="scroll-img--list flex">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="img pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src={`/images/sbm/recruit-slide-0${num}.jpg`}
                    width="640"
                    height="427"
                    className="img-cover"
                    alt=""
                  />
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`dup-${num}`} className="img pos-rel">
                  <img
                loading="lazy"
                decoding="async"
                    src={`/images/sbm/recruit-slide-0${num}.jpg`}
                    width="640"
                    height="427"
                    className="img-cover"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWS SECTION */}
        <section id="news" className="home_news">
          <div className="inner inner-lg">
            <div className="home_news--wrap flex flex-sp-block">
              <div className="ttlarea">
                <h2 className="ttl ttl-01 txt-lft">
                  <span className="jp block">MILESTONES</span>
                </h2>
                <h3 className="ttl-01-sub font-en">
                  <span className="txt">NEWS</span>
                </h3>
                <div className="btn btn-arrow">
                  <Link href="https://www.instagram.com/sbmgold_/" target="_blank" rel="noopener noreferrer">
                    <span className="txt--wrap">Follow @sbmgold_</span>
                    <span className="circle"></span>
                  </Link>
                </div>
              </div>
              <div className="posts posts-news">
                <article className="post">
                  <div className="post--info flex flex-c-wrap flex-a-ctr">
                    <p className="post--date">2025</p>
                    <div className="cat_list">
                      <span className="tag">Launch</span>
                    </div>
                  </div>
                  <div className="post--txtarea">
                    <h2 className="post--ttl">
                      <Link href="#news" className="post--link">
                        Launched uPVC profiles for windows &amp; doors and WPC door frames
                      </Link>
                    </h2>
                    <span className="circle"></span>
                  </div>
                </article>

                <article className="post">
                  <div className="post--info flex flex-c-wrap flex-a-ctr">
                    <p className="post--date">2023</p>
                    <div className="cat_list">
                      <span className="tag">Milestone</span>
                    </div>
                  </div>
                  <div className="post--txtarea">
                    <h2 className="post--ttl">
                      <Link href="#news" className="post--link">
                        First company in North East India to manufacture 450mm HDPE pipes
                      </Link>
                    </h2>
                    <span className="circle"></span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER CTA SECTION */}
      <section id="contact" className="foot_cta pos-rel">
        <div className="inner flex flex-j-between flex-sp-block">
          <div className="foot_cta--ttl">
            <h2 className="ttl ttl-01 font-en txt-lft">
              <span className="jp block">CONTACT US</span>
            </h2>
            <h3 className="ttl-01-sub font-en txt-lft mgn-btm42">
              <span className="txt">CONTACT</span>
            </h3>
            <p className="txt">
              Get in touch with the future of doors &amp; windows.<br />
              For uPVC windows and doors, WPC door frames, water tanks, pipes and wall putty, talk to SBM GOLD.<br />
              Builders, dealers and homeowners are all welcome: Yahi Hai #AsliCommitment.
            </p>
          </div>
          <div className="foot_cta--contact pos-rel">
            <ul>
              <li className="cta_contact">
                <Link href="#contact">
                  <svg
                    className="img-specif"
                    width="41"
                    height="32"
                    viewBox="0 0 41 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.75 32C3.65 32 2.70833 31.6083 1.925 30.825C1.14167 30.0417 0.75 29.1 0.75 28V4C0.75 2.9 1.14167 1.95833 1.925 1.175C2.70833 0.391667 3.65 0 4.75 0H36.75C37.85 0 38.7917 0.391667 39.575 1.175C40.3583 1.95833 40.75 2.9 40.75 4V28C40.75 29.1 40.3583 30.0417 39.575 30.825C38.7917 31.6083 37.85 32 36.75 32H4.75ZM20.75 18L4.75 8V28H36.75V8L20.75 18ZM20.75 14L36.75 4H4.75L20.75 14ZM4.75 8V4V28V8Z" />
                  </svg>
                  <span>CONTACT</span>
                </Link>
              </li>
              <li className="cta_tel">
                <a href="tel:18008893850">
                  <span className="tel">
                    TEL.<span className="num">1800-8893-850</span>
                  </span>
                  <span className="hours">Toll-free customer support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="scroll-txt">
          <div className="scroll-txt--cont flex flex-a-ctr">
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Nothing is impossible."
            />
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Nothing is impossible."
            />
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Nothing is impossible."
            />
            <img
                loading="lazy"
                decoding="async"
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Nothing is impossible."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="footer">
        <div className="bg"></div>
        <div className="inner inner-lg">
          <div className="footer_top clr-wht">
            <div className="flex flex-j-between flex-sp-block">
              <div className="footer--info">
                <h2 className="footer--logo">
                  <Link href="/">
                    <img
                loading="lazy"
                decoding="async"
                      src="/images/logo/sbm-gold-logo-stacked-white.png"
                      width="622"
                      height="454"
                      alt="SBM GOLD"
                    />
                  </Link>
                </h2>
                <address className="footer--address">
                  <p>SBM Pipe Industries Private Limited</p>
                  <p>2nd Floor, Metro Plaza, SF Road, Siliguri, West Bengal, India – 734005</p>
                </address>
                <p className="footer--tel">
                  TOLL FREE:<a href="tel:18008893850">1800-8893-850</a><br />
                  EMAIL:<a href="mailto:sbmpipeindustries@gmail.com">sbmpipeindustries@gmail.com</a>
                </p>
                <aside className="sns_area">
                  <ul className="flex flex-a-ctr">
                    <li>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/sbmgold_/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="icon-instagram">
                          <use xlinkHref="#icon-instagram"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>

              <nav className="fnav">
                <ul className="fnav--menu flex flex-c-wrap flex-sp-block">
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">About Us</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#feature" onClick={(e) => handleNavClick("#feature", e)}>Our Strengths</Link>
                      </li>
                      <li>
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Colour Shades</Link>
                      </li>
                      <li>
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Certifications</Link>
                      </li>
                      <li>
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Warranty</Link>
                      </li>
                      <li>
                        <Link href="#news" onClick={(e) => handleNavClick("#news", e)}>Milestones</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">Products</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>uPVC Windows &amp; Doors</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>WPC Door Frames</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>HDPE &amp; uPVC Pipes</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>Water Tanks</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>Wall Putty</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">Company</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#company" onClick={(e) => handleNavClick("#company", e)}>Overview</Link>
                      </li>
                      <li>
                        <Link href="#company" onClick={(e) => handleNavClick("#company", e)}>Our Journey</Link>
                      </li>
                      <li>
                        <Link href="#company" onClick={(e) => handleNavClick("#company", e)}>Sustainability</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">Partner</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Become a Partner</Link>
                      </li>
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Partner in India</Link>
                      </li>
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Distributor Network</Link>
                      </li>
                      <li>
                        <Link href="#contact" onClick={(e) => handleNavClick("#contact", e)}>Partner Inquiry</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="inner inner-lg">
          <div className="footer_btm flex flex-a-ctr flex-j-between flex-sp-block">
            <div className="footer_btm--lft">
              <ul className="footer_btm--menu flex">
                <li>
                  <Link href="#news" onClick={(e) => handleNavClick("#news", e)}>Milestones</Link>
                </li>
                <li>
                  <Link href="#footer" onClick={(e) => handleNavClick("#footer", e)}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#footer" onClick={(e) => handleNavClick("#footer", e)}>Sitemap</Link>
                </li>
              </ul>
              <div className="copyright flex flex-a-ctr flex-sp-block font-en">
                <small>&copy; SBM GOLD ALL RIGHTS RESERVED.</small>
              </div>
            </div>
            <div className="footer_btm--rgt">
              <ul className="footer--cta flex flex-sp-block">
                <li className="footer--contact cta_contact">
                  <Link href="#contact" onClick={(e) => handleNavClick("#contact", e)}>
                    <svg
                      className="img-specif"
                      width="41"
                      height="32"
                      viewBox="0 0 41 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.75 32C3.65 32 2.70833 31.6083 1.925 30.825C1.14167 30.0417 0.75 29.1 0.75 28V4C0.75 2.9 1.14167 1.95833 1.925 1.175C2.70833 0.391667 3.65 0 4.75 0H36.75C37.85 0 38.7917 0.391667 39.575 1.175C40.3583 1.95833 40.75 2.9 40.75 4V28C40.75 29.1 40.3583 30.0417 39.575 30.825C38.7917 31.6083 37.85 32 36.75 32H4.75ZM20.75 18L4.75 8V28H36.75V8L20.75 18ZM20.75 14L36.75 4H4.75L20.75 14ZM4.75 8V4V28V8Z" />
                    </svg>
                    <span>CONTACT</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
