"use client";

import { useEffect, useRef } from "react";
import Deco from "../Deco";
import { initPipeEarth } from "@/lib/pipeEarth";

/**
 * "Our pipes could wrap 76% of the way around the Earth" section.
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
        <h4 className="sub-ttl anime-fade-up">AROUND THE EARTH</h4>
        <h3 className="ttl ttl-02 txt-ctr anime-fade-up delay1" id="pe-title">
          <span className="block">
            Enough SBM GOLD pipe to wrap
            <br />
            <span className="txt-lg pe-pct" data-pe-pct>
              76%
            </span>{" "}
            of the way around the <span className="txt-lg">Earth</span>.
          </span>
        </h3>

        <div className="pe-globe-area anime-fade-up delay2">
          <div className="pe-globe">
            <canvas
              className="pe-canvas"
              role="img"
              aria-label="Rotating Earth with an SBM GOLD HDPE pipe wrapped 76% of the way around the equator"
            ></canvas>
            <div className="pe-head" aria-hidden="true">
              0 km
            </div>
          </div>
        </div>

        <div className="txt anime-fade-up delay2">
          <p>
            <strong data-pe-total>30,457 km</strong> of HDPE pipe made, laid end to end.
          </p>
        </div>
        <button className="pe-replay anime-fade-up delay3" type="button">
          ↻ Replay
        </button>
      </div>

      <Deco className="deco-1 fill blue xs anime-diag-rgt2 delay1" />
      <Deco className="deco-2 stroke blue lg anime-diag-rgt delay2" />
      <Deco className="deco-3 stroke blue lg anime-diag-rgt" />
      <Deco className="deco-4 fill wht sm anime-diag-rgt2 delay1" />

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
