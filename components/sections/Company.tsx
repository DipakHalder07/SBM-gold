import Link from "next/link";

export default function Company() {
  return (
    <section id="company" className="home_company scroll_active">
      <div className="ttl-en">
        <img
            loading="lazy"
            decoding="async"
          src="/theme/images/top/company-ttl.svg"
          width="926"
          height="170"
          className="anime-fade-rgt img-specif"
          alt="Company"
        />
      </div>

      <div className="contarea">
        <div className="cont--row row-1">
          <div className="cont--wrap cont-01">
            <Link href="/contact" className="cont--link"></Link>
            <div className="cont--bg">
              <img
            loading="lazy"
            decoding="async"
                src="/images/sbm/company-01.jpg"
                width="597"
                height="440"
                className="img-cover"
                alt=""
              />
            </div>
            <div className="cont--wrap--inner">
              <h3 className="ttl font-en">CEO Message</h3>
              <h4 className="sub-ttl font-en">MESSAGE</h4>
              <span className="circle"></span>
            </div>
          </div>

          <div className="cont--wrap cont-02">
            <Link href="/about#overview" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/company-02.jpg"
                width="597"
                height="440"
                className="img-cover"
                alt="SBM GOLD Headquarters"
              />
            </div>
            <div className="cont--wrap--inner">
              <h3 className="ttl font-en">Company Overview</h3>
              <h4 className="sub-ttl font-en">ABOUT</h4>
              <span className="circle"></span>
            </div>
          </div>

          <div className="cont--wrap cont-03">
            <Link href="/contact" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/company-03.jpg"
                width="597"
                height="440"
                className="img-cover"
                alt="Our Team"
              />
            </div>
            <div className="cont--wrap--inner">
              <h3 className="ttl font-en">Our Team</h3>
              <h4 className="sub-ttl font-en">TEAM</h4>
              <span className="circle"></span>
            </div>
          </div>
        </div>

        <div className="cont--row">
          <div className="cont--wrap cont-04">
            <Link href="/about#news" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/company-04.jpg"
                width="1792"
                height="440"
                className="img-cover"
                alt="SBM GOLD 2,25,000 sq ft Manufacturing Facility"
              />
            </div>
            <div className="cont--wrap--inner">
              <div className="ttlarea">
                <h3 className="ttl font-en">Growth &amp; Excellence</h3>
                <h4 className="sub-ttl font-en">DREAMS · DEDICATION · GROWTH</h4>
              </div>
              <p className="txt">
                A 2,25,000 sq ft modern manufacturing facility, 22,000 MT capacity, and a trusted network of 300+ dealers.
              </p>
              <span className="circle"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
