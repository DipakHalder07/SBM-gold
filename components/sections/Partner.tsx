import Link from "next/link";

export default function Partner() {
  return (
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
              Partner with SBM GOLD in India &mdash; Join Eastern India&rsquo;s most trusted manufacturing network for uPVC doors &amp; windows, WPC door frames, HDPE pipes, water tanks, and wall putty.
            </p>
            <p>
              As an authorized distributor, dealer, or project partner, scale your business with high-margin product lines, ISO &amp; ISI certified reliability, state-of-the-art extrusion, and dedicated technical &amp; marketing support.
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
  );
}
