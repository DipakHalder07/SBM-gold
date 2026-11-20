"use client";

import { useEffect, useRef } from "react";
import { initPipeEarth } from "@/lib/pipeEarth";

/**
 * "Our pipes could wrap the whole Earth" section.
 * Uses the old OUR MISSION design (.home_mission) with the rotating globe in the middle.
 * The numbers and the animation settings live at the top of lib/pipeEarth.js.
 */
export default function PipeEarth() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initPipeEarth(sectionRef.current);
  }, []);

  const gallery = [1, 2, 3, 4, 5, 6];

  return (
    <section
      ref={sectionRef}
      id="pipe-earth"
      className="home_mission pe scroll_active"
      aria-labelledby="pe-title"
    >
      <div className="bg"></div>
      <div className="inner">
        {/* TOP: A GLOBAL REACH. A STRONGER TOMORROW. */}
        <h2
          className="sub-ttl anime-fade-up"
          id="pe-title"
          style={{
            fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginBottom: "1rem",
            textWrap: "balance",
          }}
        >
          A GLOBAL REACH. A STRONGER TOMORROW.
        </h2>

        {/* GLOBE IN THE MIDDLE */}
        <div className="pe-globe-area anime-fade-up delay1">
          <div className="pe-globe">
            <canvas
              className="pe-canvas"
              role="img"
              aria-label="Rotating Earth with an SBM GOLD HDPE pipe wrapped all the way around the equator"
            ></canvas>
            <div className="pe-head" aria-hidden="true">
              0 km
            </div>
          </div>
        </div>

        {/* BOTTOM OF EARTH: SBM Gold Pipes have now covered 100% of the Earth (old small style). */}
        <div className="txt anime-fade-up delay2" style={{ marginTop: "1.25rem" }}>
          <p>
            SBM Gold Pipes have now covered{" "}
            <strong className="pe-pct" data-pe-pct>
              100%
            </strong>{" "}
            of the Earth.
          </p>
        </div>

        <button className="pe-replay anime-fade-up delay3" type="button">
          ↻ Replay
        </button>
      </div>

      {/* Seamless infinite scrolling gallery */}
      <div className="imgarea scroll-img">
        <div className="scroll-img--list flex">
          {[...gallery, ...gallery].map((num, i) => (
            <div key={i} className="img pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src={`/images/sbm/gallery-0${num}.jpg?v=3`}
                width="640"
                height="427"
                className="img-cover"
                alt={i < gallery.length ? "SBM GOLD manufacturing and product gallery" : ""}
                aria-hidden={i >= gallery.length ? true : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
