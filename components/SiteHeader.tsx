"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_NAV } from "@/lib/site";
import { getLenis } from "@/lib/smoothScroll";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  // Every page has its own h1 (home hero, inner page banner), so the logo is never the h1
  const isHome = pathname === "/";
  const LogoTag = "div";
  // Only the home hero has a shape behind the header; inner pages keep it solid white
  const solidClass = isHome ? "" : "header-sm header-sm-visible";

  useEffect(() => {
    const overflow = menuOpen ? "hidden" : "";
    if (menuOpen) getLenis()?.stop();
    else getLenis()?.start();
    document.body.style.overflow = overflow;
    document.documentElement.style.overflow = overflow;
  }, [menuOpen]);

  useEffect(() => {
    const updateHeader = () => {
      const solid = !isHome || window.scrollY > 50;
      headerRef.current?.classList.toggle("header-sm", solid);
      headerRef.current?.classList.toggle("header-sm-visible", solid);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
    return () => window.removeEventListener("scroll", updateHeader);
    // Opening or closing the menu re-renders the header's classes, so restore the scrolled state
  }, [isHome, menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleSubmenu = (key: string) => setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <header className={`header ${solidClass} ${menuOpen ? "active" : ""}`} ref={headerRef}>
      <div className="inner flex flex-j-between flex-a-ctr">
        <LogoTag className="header--logo">
          <Link href="/" onClick={closeMenu}>
            <img
              width="855"
              height="130"
              src="/images/logo/sbm-gold-logo-header.png"
              alt="SBM GOLD"
              fetchPriority="high"
            />
          </Link>
        </LogoTag>

        {/* Mobile hamburger */}
        <div
          className={`gnav_btn flex flex-j-ctr flex-a-ctr ${menuOpen ? "active" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }
          }}
        >
          <div className="gnav_btn--lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={`gnav ${menuOpen ? "active" : ""}`}>
          <ul className="gnav--menu flex flex-j-ctr">
            {HEADER_NAV.map((item) => (
              <li
                key={item.key}
                className={`menu-item ${item.children ? "menu-item-has-children" : ""} ${
                  openSubmenus[item.key] ? "active" : ""
                }`}
              >
                <Link href={item.href} className="gnav--link" onClick={closeMenu}>
                  <span>{item.label}</span>
                </Link>
                {item.children && (
                  <>
                    <div className={`head_sub_nav--wrap ${openSubmenus[item.key] ? "is-open" : ""}`}>
                      <ul className="head_sub_nav">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} className="gnav--link" onClick={closeMenu}>
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span
                      className={`gnav_sub_toggle ${openSubmenus[item.key] ? "active" : ""}`}
                      role="button"
                      aria-label={`Show ${item.label} links`}
                      aria-expanded={Boolean(openSubmenus[item.key])}
                      onClick={() => toggleSubmenu(item.key)}
                    ></span>
                  </>
                )}
              </li>
            ))}
          </ul>

          <ul className="gnav--cta flex">
            <li className="gnav--contact cta_contact">
              <Link href="/contact" onClick={closeMenu}>
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
  );
}
