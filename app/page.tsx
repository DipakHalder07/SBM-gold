"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ymdContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith("#") && href !== "#no_link") {
      if (e) e.preventDefault();
      setMobileMenuOpen(false);
      setActiveSubmenu(null);
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerH = window.innerWidth > 1080 ? 74 : 64;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else if (href.startsWith("#no_link")) {
      if (e) e.preventDefault();
    } else {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. Custom Cursor tracking
    const cursor = cursorRef.current;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursor || isTouch) return;
      cursor.style.opacity = "0.9";
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onMouseEnterMore = () => {
      if (cursor) cursor.classList.add("is-click");
    };

    const onMouseLeaveMore = () => {
      if (cursor) cursor.classList.remove("is-click");
    };

    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove);
      const moreElements = document.querySelectorAll(".more-cursor");
      moreElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterMore);
        el.addEventListener("mouseleave", onMouseLeaveMore);
      });
    }

    // 2. Scroll Active Elements (Intersection Observer / ScrollTrigger)
    const activeElements = gsap.utils.toArray<HTMLElement>(".scroll_active");
    activeElements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        onEnter: () => el.classList.add("active"),
        once: true,
      });
    });

    // 3. Header Scroll Behavior
    const handleScroll = () => {
      if (!headerRef.current) return;
      const scrollY = window.scrollY;

      if (scrollY > 60) {
        headerRef.current.classList.add("header-sm");
      } else {
        headerRef.current.classList.remove("header-sm");
      }

      const heroThreshold = window.innerHeight * 0.75;
      if (scrollY > heroThreshold) {
        headerRef.current.classList.add("header-sm-visible");
      } else {
        headerRef.current.classList.remove("header-sm-visible");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // 4. GSAP YMD Sticky Zoom Animation & Header Hide
    const moveCont1 = document.querySelector(".ymd-line-red");
    const moveCont2 = document.querySelector(".ymd-line-blue");
    const scaleCont = document.querySelector(".home_ymd--sticky .imgarea");
    const colorCont = document.querySelector(".ymd-lg-color");
    const redCont = document.querySelector(".ymd-lg-color .red-parts");
    const visibleCont = document.querySelector(".home_ymd--sticky .contarea");

    const vw = (coef: number) => window.innerWidth * (coef / 100);
    const translateXVal = window.innerWidth > 1200 ? vw(850) : vw(1000);

    // Dedicated trigger to ensure header stays hidden throughout entire home_ymd section
    ScrollTrigger.create({
      trigger: ".home_ymd",
      start: "top 85%",
      end: "bottom 10%",
      toggleClass: { targets: ".header", className: "hide" },
    });

    const tlYmd = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_ymd--scrolltarget01",
        start: "top 80%",
        endTrigger: ".home_ymd--scrolltarget01",
        end: "center top",
        scrub: true,
      },
    });

    if (moveCont1 && moveCont2 && colorCont && redCont && scaleCont && visibleCont) {
      tlYmd
        .to(moveCont1, { left: 0, top: 0 })
        .to(moveCont2, { right: 0, bottom: 0 }, "<")
        .to(colorCont, { opacity: 1 })
        .to(redCont, { opacity: 1 })
        .to(scaleCont, { scale: 30, translateX: translateXVal })
        .to(visibleCont, { opacity: 1 });
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleSubmenu = (menuKey: string) => {
    setActiveSubmenu(activeSubmenu === menuKey ? null : menuKey);
  };

  return (
    <>
      {/* Custom Cursor */}
      <div id="cursor" ref={cursorRef}></div>

      {/* Header */}
      <header className={`header ${mobileMenuOpen ? "active" : ""}`} ref={headerRef}>
        <div className="inner flex flex-j-between flex-a-ctr">
          <h1 className="header--logo">
            <Link href="/">
              <img
                width="400"
                height="294"
                src="/images/logo/sbm-gold-logo.png"
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
              <li className="menu-item menu-item-has-children">
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
                  className={`head_sub_nav--wrap ${activeSubmenu === "ymd" ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#feature" className="gnav--link" onClick={(e) => handleNavClick("#feature", e)}>
                        <span>Our Strengths</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Equipment</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Manufacturing Plant</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#quality" className="gnav--link" onClick={(e) => handleNavClick("#quality", e)}>
                        <span>Quality Control</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${activeSubmenu === "ymd" ? "active" : ""}`}
                  onClick={() => toggleSubmenu("ymd")}
                ></span>
              </li>

              <li className="menu-item menu-item-has-children">
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
                  className={`head_sub_nav--wrap ${activeSubmenu === "products" ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>Custom Parts</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>Production Equipment</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#products" className="gnav--link" onClick={(e) => handleNavClick("#products", e)}>
                        <span>Other Components</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${activeSubmenu === "products" ? "active" : ""}`}
                  onClick={() => toggleSubmenu("products")}
                ></span>
              </li>

              <li className="menu-item">
                <a
                  href="https://r16759029.theta360.biz/t/a4f2c6b0-1582-11ee-90d3-060182f6995f-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gnav--link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>360° Tour</span>
                </a>
              </li>

              <li className="menu-item menu-item-has-children">
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
                  className={`head_sub_nav--wrap ${activeSubmenu === "company" ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#company" className="gnav--link" onClick={(e) => handleNavClick("#company", e)}>
                        <span>Overview</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#company" className="gnav--link" onClick={(e) => handleNavClick("#company", e)}>
                        <span>CEO Message</span>
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
                  className={`gnav_sub_toggle ${activeSubmenu === "company" ? "active" : ""}`}
                  onClick={() => toggleSubmenu("company")}
                ></span>
              </li>

              <li className="menu-item menu-item-has-children">
                <a
                  href="#no_link"
                  className="gnav--link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu("recruit");
                  }}
                >
                  <span>Careers</span>
                </a>
                <div
                  className={`head_sub_nav--wrap ${activeSubmenu === "recruit" ? "is-open" : ""}`}
                >
                  <ul className="head_sub_nav">
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Careers Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Why SBM GOLD</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Interviews</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#recruit" className="gnav--link" onClick={(e) => handleNavClick("#recruit", e)}>
                        <span>Job Openings</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span
                  className={`gnav_sub_toggle ${activeSubmenu === "recruit" ? "active" : ""}`}
                  onClick={() => toggleSubmenu("recruit")}
                ></span>
              </li>

              <li className="menu-item">
                <Link href="#about" className="gnav--link" onClick={(e) => handleNavClick("#about", e)}>
                  <span>Global</span>
                </Link>
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

            <div className="gnav--btm pc-none">
              <ul className="gnav--btm--menu flex flex-col2">
                <li>
                  <Link href="#news" onClick={(e) => handleNavClick("#news", e)}>News</Link>
                </li>
                <li>
                  <Link href="#footer" onClick={(e) => handleNavClick("#footer", e)}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#footer" onClick={(e) => handleNavClick("#footer", e)}>Sitemap</Link>
                </li>
              </ul>
              <div className="copyright">&copy; SBM GOLD ALL RIGHTS RESERVED.</div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <div className="hero">
          <div className="hero--movie pos-rel">
            <video
              ref={videoRef}
              id="responsive-video"
              muted
              playsInline
              autoPlay
              loop
              width="1920"
              height="1080"
              className="img-cover"
            >
              <source
                src="/wp/wp-content/themes/standard_sass/video/fv01.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <section className="hero--cont scroll_active active">
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
                    The Optimal
                  </span>
                  <span className="row-02 anime-fade-lft delay1">
                    <span className="txt-lg">Solution</span>
                  </span>
                </span>
                <img
                  src="/images/logo/sbm-gold-icon.png"
                  width="140"
                  height="124"
                  className="hero-icon-img anime-fade-lft delay2"
                  alt="SBM GOLD"
                />
              </h2>
              <p className="txt anime-fade-up delay3 sp-none">
                Your trusted partner in global procurement &amp; precision manufacturing. Delivering 99% custom-engineered solutions with guaranteed quality.
              </p>
              <div className="btn anime-fade-up delay3 sp-none">
                <a
                  href="https://r16759029.theta360.biz/t/a4f2c6b0-1582-11ee-90d3-060182f6995f-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>360° Factory Tour</span>
                </a>
              </div>
            </div>

            {/* Marquee Ticker */}
            <div className="scroll-txt pos_rel">
              <div className="scroll-txt--cont flex flex-a-ctr">
                <img
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Noting is impossible."
                />
                <img
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Noting is impossible."
                />
                <img
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Noting is impossible."
                />
                <img
                  src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-wht.svg"
                  width="2144"
                  height="196"
                  alt="Noting is impossible."
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
                <path d="M88 0L0 133.583H88L88 0Z" fill="#BA0303" />
              </svg>
            </span>
          </section>

          {/* SP Hero */}
          <div className="hero--cont-sp pc-none scroll_active">
            <div className="inner">
              <p className="txt anime-fade-up delay3">
                Your trusted partner in global procurement &amp; precision manufacturing.
                Delivering 99% custom-engineered solutions with guaranteed quality.
              </p>
              <div className="btn anime-fade-up delay3">
                <a
                  href="https://r16759029.theta360.biz/t/a4f2c6b0-1582-11ee-90d3-060182f6995f-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>360° Factory Tour</span>
                </a>
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
                  &ldquo;Count on SBM GOLD for Every Solution&rdquo;<br />
                  Your Trusted Professional Partner in<br />
                  <span className="txt-lg">Precision Parts</span> &amp; <span className="txt-lg">Procurement</span>.
                </span>
              </h3>
              <div className="txt anime-fade-up delay2">
                <p>
                  We are more than just an industrial parts supplier.<br />
                  <span className="bold">99% of our delivered components are custom-made.</span><br />
                  Empowering modern manufacturing with precision and limitless potential.<br className="pc-none" />
                  Expanding our global procurement network to deliver unmatched quality.<br className="pc-none" />
                  Committed to driving your business forward every step of the way.
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
                      src={`/wp/wp-content/themes/standard_sass/images/top/mission-slide0${num}.png`}
                      width="640"
                      height="427"
                      className="img-cover"
                      alt={`Mission slide 0${num}`}
                    />
                  </div>
                ))}
                {/* Repetition for continuous loop */}
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={`dup-${num}`} className="img pos-rel">
                    <img
                      src={`/wp/wp-content/themes/standard_sass/images/top/mission-slide0${num}.png`}
                      width="640"
                      height="427"
                      className="img-cover"
                      alt={`Mission slide 0${num}`}
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
                99% Custom-Made Precision Components!<br />
                Tailored to your exact specifications,<br />
                delivering optimal quality and speed.
              </h3>
              <p className="txt">
                Combining global trading power with dedicated manufacturer capabilities, SBM GOLD operates as your integrated manufacturing partner. Our specialized sales engineers analyze technical drawings, evaluate precision requirements, and deliver optimal procurement with guaranteed quality. From order to processing, assembly, and inspection — your one-stop partner.
              </p>
              <div className="btn btn-wh">
                <Link href="#feature">Explore SBM GOLD</Link>
              </div>
            </div>

            <div className="contarea">
              <div className="contarea--row1 flex flex-j-ctr">
                <div className="cont--wrap cont-01 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale">
                  <span className="sub-ttl font-en">
                    100+ Global &amp; Domestic<br />Procurement Sources
                  </span>
                  <h4 className="ttl font-en">TRADING</h4>
                  <span className="icon">
                    <img
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
                    Custom-Engineered<br />Parts Manufacturing
                  </span>
                  <h4 className="ttl font-en">MAKER</h4>
                  <span className="icon">
                    <img
                      src="/wp/wp-content/themes/standard_sass/images/top/about-icn02.svg"
                      width="176"
                      height="176"
                      alt=""
                    />
                  </span>
                </div>
                <div className="cont--wrap cont-03 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale delay2">
                  <span className="sub-ttl font-en">
                    Certified QA Inspectors &amp;<br />Advanced Inspection Tech
                  </span>
                  <h4 className="ttl font-en">QUALITY ASSURANCE</h4>
                  <span className="icon">
                    <img
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
                    src="/wp/wp-content/themes/standard_sass/images/top/feature-img01.jpg"
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
                    Meeting Diverse Needs with<br />Custom-Engineered Parts
                  </h4>
                  <p className="txt">
                    99% of our components are custom-engineered to order. Beyond fulfilling exact specifications, we proactively propose optimized manufacturing solutions trusted by global leaders.
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
                    src="/wp/wp-content/themes/standard_sass/images/top/feature-img02.png"
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
                    Global Sourcing Network<br />Delivering Optimal Procurement
                  </h4>
                  <p className="txt">
                    With 100+ trusted partners across Asia, Europe, and America, plus partner facilities worldwide, we combine international engineering expertise with rapid delivery to handle any custom challenge.
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
                    src="/wp/wp-content/themes/standard_sass/images/top/feature-img04.png"
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
                    Rigorous Inspection Guaranteeing<br />Superior Quality
                  </h4>
                  <p className="txt">
                    Every manufactured component undergoes thorough inspection under strict QA standards by certified engineers using 3D coordinate measuring machines (CMM) and optical instruments.
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
                    src="/wp/wp-content/themes/standard_sass/images/top/feature-img05.png"
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
                    Integrated Machining &amp; Assembly<br />Under One Roof
                  </h4>
                  <p className="txt">
                    Our dedicated assembly plant seamlessly integrates machining, sub-assembly, and finishing in-house — cutting lead times, reducing supply chain costs, and delivering turnkey reliability.
                  </p>
                  <div className="btn">
                    <Link href="#quality">Explore Assembly Plant</Link>
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
                    src="/wp/wp-content/themes/standard_sass/images/top/feature-img03.png"
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
                    Expert Sales Engineers<br />Providing Technical Solutions
                  </h4>
                  <p className="txt">
                    Our seasoned sales engineers analyze engineering drawings and tolerances directly, making rapid, precise recommendations. From initial quote to final delivery, we manage every step with full accountability.
                  </p>
                  <div className="btn">
                    <Link href="#contact">View Case Studies</Link>
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
              <div className="cont--wrap cont-01 pos-rel more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/quality-img01.jpg"
                    width="700"
                    height="480"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">Commitment to Quality</h4>
                  <p className="txt">
                    As precision manufacturing specialists, quality is our bedrock. We maintain state-of-the-art CMM measuring facilities and rigorous inspection protocols for 100% defect-free delivery.
                  </p>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-02 pos-rel more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/quality-img02.jpg"
                    width="700"
                    height="220"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">Equipment List</h4>
                  <p className="txt">Explore our advanced testing, inspection, and machining equipment.</p>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-03 more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/quality-img03.jpg"
                    width="700"
                    height="220"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h4 className="ttl font-en">Assembly Plant</h4>
                  <p className="txt">Tour our modern processing and sub-assembly facility.</p>
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
              <div className="cont--wrap cont-01 more-cursor pos-rel">
                <span className="num font-en">01</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/product-img01.png"
                    width="398"
                    height="266"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    Custom Parts
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    High-precision parts, mold &amp; die components, and mechanical assemblies engineered to exact tolerances.
                  </div>
                </div>
              </div>

              <div className="cont--wrap cont-02 more-cursor pos-rel">
                <span className="num font-en">02</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/product-img02.jpg"
                    width="399"
                    height="266"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    Equipment
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    Custom automation machinery, specialized equipment, and labor-saving systems boosting factory productivity.
                  </div>
                </div>
              </div>

              <div className="cont--wrap cont-03 more-cursor pos-rel">
                <span className="num font-en">03</span>
                <Link href="#contact" className="cont--link"></Link>
                <div className="imgarea">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/product-img03.png"
                    width="399"
                    height="266"
                    alt=""
                  />
                </div>
                <div className="txtarea">
                  <h4 className="ttl font-en">
                    Components
                    <span className="arrow"></span>
                  </h4>
                  <div className="txt">
                    Industrial leaf springs, coil springs, washers, hardware, and automotive parts across diverse sectors.
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
              src="/wp/wp-content/themes/standard_sass/images/top/company-ttl.svg"
              width="926"
              height="170"
              className="anime-fade-rgt img-specif"
              alt="Company"
            />
          </div>

          <div className="contarea">
            <div className="cont--row row-1">
              <div className="cont--wrap cont-01 more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/company-img01.jpg"
                    width="597"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <h3 className="ttl font-en">CEO Message</h3>
                  <h4 className="sub-ttl font-en">MESSAGE</h4>
                  <span className="circle"></span>
                </div>
              </div>

              <div className="cont--wrap cont-02 more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/company-img02.jpg"
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

              <div className="cont--wrap cont-03 more-cursor">
                <Link href="#contact" className="cont--link"></Link>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/company-img03.jpg"
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
              <div className="cont--wrap cont-04 more-cursor">
                <a
                  href="https://r16759029.theta360.biz/t/a4f2c6b0-1582-11ee-90d3-060182f6995f-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cont--link"
                ></a>
                <div className="cont--bg">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/company-img04.jpg"
                    width="1792"
                    height="440"
                    className="img-cover"
                    alt=""
                  />
                </div>
                <div className="cont--wrap--inner">
                  <div className="ttlarea">
                    <h3 className="ttl font-en">360° Factory Tour</h3>
                    <h4 className="sub-ttl font-en">FACTORY TOUR</h4>
                  </div>
                  <p className="txt">
                    Take an immersive virtual tour through our modern manufacturing and assembly floors. Discover our cutting-edge machinery and precision inspection facilities.
                  </p>
                  <span className="circle"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YMD ZOOM ANIMATION SECTION */}
        <div className="home_ymd" ref={ymdContainerRef}>
          <div className="home_ymd--sticky">
            <div className="imgarea pos-rel">
              <svg
                className="ymd-lg-color new img-specif"
                viewBox="0 0 1716 513"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M203.991 511.838L341.249 305.582V511.838H203.991Z"
                  fill="#0D3387"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M202.125 512.838L342.249 302.274V512.838H202.125ZM203.991 511.838H341.249V305.582L203.991 511.838Z"
                  fill="#0D3387"
                />
                <path
                  className="red-parts"
                  d="M41.3166 511.563L40.8059 512.338H41.7341H203.991H204.259L204.408 512.115L544.356 1.27701L544.873 0.5H543.94H445.232C403.266 0.5 364.129 21.6003 341.064 56.6113L41.3166 511.563Z"
                  fill="#E62320"
                  stroke="#E62320"
                />
                <path
                  d="M201.042 271.858L276.859 156.765L168.604 0H0.0168457L201.042 271.858Z"
                  fill="#0D3387"
                />
                <path
                  d="M1131.62 0H1013.18L856.317 180.988L701.456 2.48122L699.309 0H581V512.838H719.593V213.976L856.317 372.685L993.023 213.976V512.838H1131.62V0Z"
                  fill="#0D3387"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1432.56 0H1205.56V512.838H1418.6C1512.61 512.838 1586.35 489.991 1637.58 444.857C1689.07 399.501 1715.13 336.341 1715.13 257.334C1715.15 181.906 1689.49 119.448 1638.84 71.7186C1588.33 24.1057 1518.86 0 1432.56 0ZM1417.88 407.07H1344.13V105.768H1416.46C1467.13 105.768 1506.25 119.325 1532.8 145.928C1559.42 172.546 1572.98 209.722 1572.98 256.598C1572.98 301.869 1559.57 338.609 1533.26 365.937C1507.03 393.178 1468.26 407.07 1417.88 407.07Z"
                  fill="#0D3387"
                />
              </svg>

              <svg
                className="ymd-line-red img-specif"
                width="1712"
                height="510"
                viewBox="0 0 1712 510"
                fill="none"
              >
                <g opacity="0.5">
                  <path
                    d="M1.54919 0.5H166.298L266.503 145.445L192.179 258.06L1.54919 0.5Z"
                    stroke="#E62320"
                  />
                  <path
                    d="M339.081 509.277H216.755L339.081 325.822V509.277Z"
                    stroke="#E62320"
                  />
                  <path
                    d="M340.133 56.0786L340.134 56.0778C362.984 21.3087 401.831 0.5 443.367 0.5H541.09L202.057 509.277H41.1647L340.133 56.0786Z"
                    stroke="#E62320"
                  />
                  <path
                    d="M989.718 209.542L852.436 368.561L715.153 209.542L714.275 208.524V209.869V509.277H578.828V0.5H694.843L696.582 2.48452L696.584 2.48614L852.058 181.486L852.436 181.921L852.813 181.486L1009.89 0.5H1126.04V509.277H990.597V209.869V208.524L989.718 209.542Z"
                    stroke="#E62320"
                  />
                  <path
                    d="M1633.8 441.737L1633.63 441.887V442.021C1582.75 486.567 1509.52 509.277 1415.9 509.277H1204.51V0.5H1429.8C1515.81 0.5 1584.78 24.4639 1635.01 71.5332C1685.24 118.879 1710.7 177.109 1710.7 255.697C1710.7 334.296 1684.83 396.827 1633.8 441.737ZM1340.09 406.124V406.624H1340.59H1415.23C1465.93 406.624 1505.08 392.714 1531.65 365.09C1558.21 337.484 1571.74 301.902 1571.74 254.889C1571.74 207.883 1558.21 170.406 1531.24 143.468L1531.24 143.467C1504.26 116.657 1464.71 103.019 1413.88 103.019H1340.59H1340.09V103.519V406.124Z"
                    stroke="#E62320"
                  />
                </g>
              </svg>

              <svg
                className="ymd-line-blue img-specif"
                width="1712"
                height="510"
                viewBox="0 0 1712 510"
                fill="none"
              >
                <g opacity="0.5">
                  <path
                    d="M1.54919 0.5H166.298L266.503 145.445L192.179 258.06L1.54919 0.5Z"
                    stroke="#0D3387"
                  />
                  <path
                    d="M339.081 509.277H216.755L339.081 325.822V509.277Z"
                    stroke="#0D3387"
                  />
                  <path
                    d="M340.133 56.0786L340.134 56.0778C362.984 21.3087 401.831 0.5 443.367 0.5H541.09L202.057 509.277H41.1647L340.133 56.0786Z"
                    stroke="#0D3387"
                  />
                  <path
                    d="M989.718 209.542L852.436 368.561L715.153 209.542L714.275 208.524V209.869V509.277H578.828V0.5H694.843L696.582 2.48452L696.584 2.48614L852.058 181.486L852.436 181.921L852.813 181.486L1009.89 0.5H1126.04V509.277H990.597V209.869V208.524L989.718 209.542Z"
                    stroke="#0D3387"
                  />
                  <path
                    d="M1633.8 441.737L1633.63 441.887V442.021C1582.75 486.567 1509.52 509.277 1415.9 509.277H1204.51V0.5H1429.8C1515.81 0.5 1584.78 24.4639 1635.01 71.5332C1685.24 118.879 1710.7 177.109 1710.7 255.697C1710.7 334.296 1684.83 396.827 1633.8 441.737ZM1340.09 406.124V406.624H1340.59H1415.23C1465.93 406.624 1505.08 392.714 1531.65 365.09C1558.21 337.484 1571.74 301.902 1571.74 254.889C1571.74 207.883 1558.21 170.406 1531.24 143.468L1531.24 143.467C1504.26 116.657 1464.71 103.019 1413.88 103.019H1340.59H1340.09V103.519V406.124Z"
                    stroke="#0D3387"
                  />
                </g>
              </svg>

              <img
                src="/wp/wp-content/themes/standard_sass/images/top/ymd-img.png"
                width="1712"
                height="510"
                className="ymd-lg-img"
                alt=""
              />
            </div>

            <div className="contarea pos-rel">
              <div className="bg"></div>
              <div className="scroll-txt top">
                <div className="scroll-txt--cont flex flex-a-ctr">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                </div>
              </div>
              <h3 className="catch font-en txt-ctr">
                <span className="txt-lg">CREATE</span> YOUR<br className="pc-none" />
                <span className="txt-lg">OWN</span>
                <span className="txt-lg">VALUE</span>
              </h3>
              <div className="scroll-txt bottom">
                <div className="scroll-txt--cont reverse flex flex-a-ctr">
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
                    src="/wp/wp-content/themes/standard_sass/images/top/recruit-txt.svg"
                    width="2194"
                    height="145"
                    alt=""
                  />
                  <img
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

        {/* RECRUIT SECTION */}
        <section id="recruit" className="home_recruit pos-rel scroll_active">
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
                <span className="jp block">CAREERS</span>
              </h2>
              <h3 className="ttl-01-sub font-en">
                <span className="txt">RECRUIT</span>
              </h3>
              <div className="txt">
                <p>
                  We celebrate individual initiative, creativity, and personal growth. With diverse global clients, our team members have the autonomy to innovate, build trusted partnerships, and shape the future of manufacturing.
                </p>
                <p>
                  Through continuous professional development, skill certification programs, and merit-based rewards, we empower our team to thrive in an inclusive, forward-thinking workplace. Explore your potential with SBM GOLD.
                </p>
              </div>
              <div className="btn btn-wh">
                <Link href="#contact">View Career Opportunities</Link>
              </div>
            </div>
            <div className="imgarea">
              <img
                src="/wp/wp-content/themes/standard_sass/images/top/recruit-img.png"
                width="808"
                height="800"
                alt=""
              />
            </div>
          </div>

          <div className="recruit--scroll scroll-img">
            <div className="scroll-img--list flex">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="img pos-rel">
                  <img
                    src={`/wp/wp-content/themes/standard_sass/images/top/recruit-slide0${num}.png`}
                    width="640"
                    height="427"
                    className="img-cover"
                    alt={`Recruit slide 0${num}`}
                  />
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`dup-${num}`} className="img pos-rel">
                  <img
                    src={`/wp/wp-content/themes/standard_sass/images/top/recruit-slide0${num}.png`}
                    width="640"
                    height="427"
                    className="img-cover"
                    alt={`Recruit slide 0${num}`}
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
                  <span className="jp block">LATEST NEWS</span>
                </h2>
                <h3 className="ttl-01-sub font-en">
                  <span className="txt">NEWS</span>
                </h3>
                <div className="btn btn-arrow">
                  <Link href="#news">
                    <span className="txt--wrap">View All News</span>
                    <span className="circle"></span>
                  </Link>
                </div>
              </div>
              <div className="posts posts-news">
                <article className="post more-cursor">
                  <div className="post--info flex flex-c-wrap flex-a-ctr">
                    <p className="post--date">2025.05.27</p>
                    <div className="cat_list">
                      <span className="tag">Update</span>
                    </div>
                  </div>
                  <div className="post--txtarea">
                    <h2 className="post--ttl">
                      <Link href="#news" className="post--link">
                        SBM GOLD official social media channels launched!
                      </Link>
                    </h2>
                    <span className="circle"></span>
                  </div>
                </article>

                <article className="post more-cursor">
                  <div className="post--info flex flex-c-wrap flex-a-ctr">
                    <p className="post--date">2025.04.18</p>
                    <div className="cat_list">
                      <span className="tag">Update</span>
                    </div>
                  </div>
                  <div className="post--txtarea">
                    <h2 className="post--ttl">
                      <Link href="#news" className="post--link">
                        Our corporate website has been nominated on Awwwards!
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
            <h3 className="ttl-01-sub font-en txt-ctr mgn-btm42">
              <span className="txt">CONTACT</span>
            </h3>
            <p className="txt">
              For custom precision parts, global procurement, and production equipment, partner with SBM GOLD.<br />
              We deliver optimal solutions tailored to your technical and operational requirements.<br />
              We also warmly welcome passionate candidates to explore global career opportunities with us.
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
                <a href="tel:0527763311">
                  <span className="tel">
                    TEL.<span className="num">052-776-3311</span>
                  </span>
                  <span className="hours">[Hours] Mon - Fri 9:00 AM – 5:00 PM</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="scroll-txt">
          <div className="scroll-txt--cont flex flex-a-ctr">
            <img
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Noting is impossible."
            />
            <img
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Noting is impossible."
            />
            <img
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Noting is impossible."
            />
            <img
              src="/wp/wp-content/themes/standard_sass/images/common/deco-txt-gray.svg"
              width="2144"
              height="196"
              alt="Noting is impossible."
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
                      src="/images/logo/sbm-gold-logo-white.png"
                      width="215"
                      height="158"
                      alt="SBM GOLD"
                    />
                  </Link>
                </h2>
                <address className="footer--address">
                  <p>SBM GOLD</p>
                  <p>1-152 Hongo, Meito-ku, Nagoya, Aichi 465-0024 Japan</p>
                </address>
                <p className="footer--tel">
                  TEL:<a href="tel:0527763311">+81-52-776-3311</a> / FAX:+81-52-776-3609
                </p>
                <aside className="sns_area">
                  <ul className="flex flex-a-ctr">
                    <li>
                      <a
                        className="facebook"
                        href="https://www.facebook.com/share/1HTMEX7Ukq/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="icon-facebook">
                          <use xlinkHref="#icon-facebook"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/ymd_inc_official?igsh=cTh6YjVzNzU4Zm03&utm_source=qr"
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
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Equipment</Link>
                      </li>
                      <li>
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Manufacturing Plant</Link>
                      </li>
                      <li>
                        <Link href="#quality" onClick={(e) => handleNavClick("#quality", e)}>Quality Control</Link>
                      </li>
                      <li>
                        <a
                          href="https://r16759029.theta360.biz/t/a4f2c6b0-1582-11ee-90d3-060182f6995f-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          360° Tour
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">Products</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>Custom Parts</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>Production Equipment</Link>
                      </li>
                      <li>
                        <Link href="#products" onClick={(e) => handleNavClick("#products", e)}>Other Components</Link>
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
                        <Link href="#company" onClick={(e) => handleNavClick("#company", e)}>CEO Message</Link>
                      </li>
                      <li>
                        <Link href="#company" onClick={(e) => handleNavClick("#company", e)}>Sustainability</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item menu-item-has-children">
                    <a href="#no_link">Careers</a>
                    <ul className="sub-menu">
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Careers Home</Link>
                      </li>
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Why SBM GOLD</Link>
                      </li>
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Interviews</Link>
                      </li>
                      <li>
                        <Link href="#recruit" onClick={(e) => handleNavClick("#recruit", e)}>Job Openings</Link>
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
                  <Link href="#news" onClick={(e) => handleNavClick("#news", e)}>News</Link>
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
                <p className="pbl">
                  <a
                    href="https://leapy.jp/website-production/corporate-site/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/wp/wp-content/themes/standard_sass/images/common/pbl-wh.svg"
                      alt="Website Production"
                      width="120"
                      height="13"
                    />
                  </a>
                </p>
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

      {/* Cookie Notice Banner */}
      {!cookieAccepted && (
        <div
          id="cookie-notice"
          role="dialog"
          className="cn-position-bottom"
          aria-label="Cookie Notice"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(17, 17, 17, 0.88)",
            padding: "16px 24px",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className="cookie-notice-container"
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span id="cn-notice-text" className="cn-text-container" style={{ fontSize: "13px" }}>
              We use cookies to ensure you get the best experience on our website. By continuing to browse, you agree to our use of cookies.
            </span>
            <span id="cn-notice-buttons" className="cn-buttons-container" style={{ display: "flex", gap: "8px" }}>
              <button
                id="cn-accept-cookie"
                className="cn-set-cookie cn-button"
                style={{
                  backgroundColor: "#0d3387",
                  color: "#fff",
                  border: "none",
                  padding: "8px 24px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
                onClick={() => setCookieAccepted(true)}
              >
                OK
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
