import Link from "next/link";

export default function AboutIntro({ ctaHref = "/about", ctaLabel = "Explore SBM GOLD" }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <section id="about" className="home_about bg-primary-dark clr-wht pos-rel">
      <div className="ttl-en scroll_active">
        <img
            loading="lazy"
            decoding="async"
          src="/theme/images/top/about-ttl.svg"
          width="1124"
          height="149"
          className="anime-fade-lft img-specif"
          alt="Our Service"
        />
      </div>
      <div className="inner inner-md home_about--cont scroll_active">
        <div className="txtarea">
          <h2 className="ttl ttl-01 txt-lft mgn-btm64">
            <span className="jp block">ABOUT US</span>
          </h2>
          <h3 className="catch font-en">
            From Pipes to Profiles.<br />
            A Legacy of Precision Extrusion.
          </h3>
          <p className="txt">
            Backed by SBM GOLD&rsquo;s legacy of quality and innovation, our uPVC doors and windows profiles offer world-class, custom solutions for Indian homes. Crafted with German technology and automated precision, they ensure all-weather durability and superior noise and heat insulation.
          </p>
          <div className="btn btn-wh">
            <Link href={ctaHref}>{ctaLabel}</Link>
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
                  src="/theme/images/top/about-icn01.svg"
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
                  src="/theme/images/top/about-icn02.svg"
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
                  src="/theme/images/top/about-icn03.svg"
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
  );
}
