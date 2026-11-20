import Link from "next/link";

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
    </section>
  );
}
