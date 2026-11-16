import Link from "next/link";

const SLIDE_ALTS = [
  "SBM GOLD uPVC windows on a red background",
  "uPVC windows and a door on a red background",
  "SBM GOLD wall putty bags",
  "Rolled green shade net",
  "Bundles of SBM GOLD pipes in blue packaging",
  "Drip irrigation line watering seedlings",
];

export default function Partner() {
  return (
    <section id="recruit" className="home_recruit pos-rel scroll_active">
      <span id="partner" className="pos-abs" style={{ top: "-100px" }}></span>

      <div className="inner inner-xl flex flex-a-ctr flex-j-between flex-sp-block">
        <div className="txtarea">
          <h2 className="ttl ttl-01 txt-lft">
            <span className="ttl-txt block">BECOME A PARTNER</span>
          </h2>
          <div className="txt">
            <p>
              Partner with SBM GOLD in India &mdash; Join Eastern India&rsquo;s most trusted manufacturing network for uPVC doors &amp; windows, WPC door frames, HDPE pipes, water tanks, and wall putty.
            </p>
            <p>
              As an authorized distributor, dealer, or project partner, scale your business with high-margin product lines, ISO &amp; BIS certified reliability, state-of-the-art extrusion, and dedicated technical &amp; marketing support.
            </p>
          </div>
          <div className="btn btn-wh">
            <Link href="/partner">Become a Partner</Link>
          </div>
        </div>
        <div className="imgarea">
          <img
            loading="lazy"
            decoding="async"
            src="/images/sbm/partner-img.webp?v=2"
            width="808"
            height="800"
            alt="Partner with SBM GOLD in India"
          />
        </div>
      </div>

      <div className="recruit--scroll scroll-img">
        <div className="scroll-img--list flex">
          {/* first set is described for search engines and screen readers; the repeat that makes the loop is hidden */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="img pos-rel">
              <img
            loading="lazy"
            decoding="async"
                src={`/images/sbm/recruit-slide-0${num}.jpg`}
                width="640"
                height="427"
                className="img-cover"
                alt={SLIDE_ALTS[num - 1]}
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
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
