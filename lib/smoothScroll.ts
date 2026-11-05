import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Smooth-scrolls to a same-page "#id" target, leaving room for the fixed header. */
export function scrollToHash(hash: string, e?: { preventDefault(): void }) {
  const target = document.getElementById(hash.replace(/^#/, ""));
  if (!target) return;
  e?.preventDefault();
  const headerHeight = window.innerWidth > 1080 ? 74 : 72;
  if (lenis) {
    lenis.scrollTo(target, { offset: -headerHeight, duration: 0.5 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
