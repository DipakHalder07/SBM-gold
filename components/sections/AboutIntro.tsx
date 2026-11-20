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
            <span className="ttl-txt block">ABOUT US</span>
          </h2>
          <h3 className="catch font-en">
            Engineering Quality. Building a Legacy of Trust.

          </h3>
          <p className="txt">
            From pipes and water tanks to UPVC profiles, SBM Gold brings together a diverse range of solutions for homes, businesses and infrastructure.
            <br />Driven by innovation, precision manufacturing and a commitment to quality, we create products designed for durability, dependable performance and everyday needs.

          </p>
          <div className="btn btn-wh">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </div>
        </div>

        <div className="contarea">
          <div className="contarea--row1 flex flex-j-ctr">
            <div className="cont--wrap cont-01 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale">
              <span className="icon">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/theme/images/top/about-icn01.svg"
                  width="44"
                  height="44"
                  alt=""
                />
              </span>
              <span className="sub-ttl font-en">
                10+ Years of<br />Extrusion Expertise
              </span>
            </div>
          </div>
          <div className="contarea--row2 flex flex-j-ctr">
            <div className="cont--wrap cont-02 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale delay1">
              <span className="icon">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/theme/images/top/about-icn02.svg"
                  width="44"
                  height="44"
                  alt=""
                />
              </span>
              <span className="sub-ttl font-en">
                22,000 MT Annual<br />Manufacturing<br />Capacity
              </span>
            </div>
            <div className="cont--wrap cont-03 txt-ctr flex flex-j-ctr flex-a-ctr flex-column anime-fade-scale delay2">
              <span className="icon">
                <img
                  loading="lazy"
                  decoding="async"
                  src="/theme/images/top/about-icn03.svg"
                  width="44"
                  height="44"
                  alt=""
                />
              </span>
              <span className="sub-ttl font-en">
                ISO &amp; BIS Certified<br />Quality Assurance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
