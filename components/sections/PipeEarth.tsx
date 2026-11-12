"use client";

import { useEffect, useRef } from "react";
import Deco from "../Deco";
import { initPipeEarth } from "@/lib/pipeEarth";

/**
 * "Our pipes could wrap 76% of the way around the Earth" section.
 * The numbers and the animation settings live at the top of lib/pipeEarth.js.
 */
export default function PipeEarth() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return initPipeEarth(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pipe-earth"
      className="home_earth pe section_pdg pos-rel scroll_active"
      aria-labelledby="pe-title"
    >
      <Deco className="pe-deco-1 stroke blue lg reverse anime-diag-lft" />
      <Deco className="pe-deco-2 fill red xs reverse anime-diag-lft2 delay1" />
      <Deco className="pe-deco-3 stroke red md anime-diag-rgt delay1" />

      <div className="inner inner-lg">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-ctr">
            <span className="jp block">AROUND THE EARTH</span>
          </h2>
        </div>

        <div className="pe-card">
          <div className="pe-copy">
            <h3 className="pe-title" id="pe-title">
              <span className="pe-numdeco">
                <span className="pe-numdeco-txt">HDPE</span>
                <span className="pe-numdeco-num" data-pe-pct>
                  76%
                </span>
              </span>
              <span className="pe-title-txt">
                of the Earth&rsquo;s equator, wrapped in SBM&nbsp;GOLD pipe
              </span>
            </h3>
            <p className="pe-lede">
              Lay every metre of SBM GOLD HDPE pipe we have manufactured end to end and it stretches{" "}
              <strong data-pe-km>30,457 km</strong>, about three-quarters of the way around the equator.
            </p>

            <div className="pe-bar" aria-hidden="true">
              <div className="pe-bar-track">
                <div className="pe-bar-fill"></div>
              </div>
              <div className="pe-bar-labels">
                <span>0 km</span>
                <span>
                  <span data-pe-circ>40,075 km</span> = one full lap
                </span>
              </div>
            </div>

            <ul className="pe-stats">
              <li>
                <b data-pe-total>30,457 km</b>
                <span>of pipe manufactured, end to end</span>
              </li>
              <li>
                <b data-pe-circ>40,075 km</b>
                <span>Earth&rsquo;s circumference at the equator</span>
              </li>
              <li>
                <b data-pe-left>9,618 km</b>
                <span>to go until the first full lap</span>
              </li>
            </ul>
            <p className="pe-note">Illustration. Pipe thickness exaggerated so it&rsquo;s visible from space.</p>
          </div>

          <div className="pe-globe-area">
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
            <button className="pe-replay" type="button">
              ↻ Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
