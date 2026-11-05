import Link from "next/link";

export default function Quality() {
  return (
    <section id="quality" className="home_quality scroll_active">
      <span className="deco deco-1 stroke blue lg reverse anime-diag-lft">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>
      <span className="deco deco-2 fill blue xs reverse anime-diag-lft2 delay1">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>

      <div className="inner inner-md">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-ctr">
            <span className="jp block">QUALITY CONTROL</span>
          </h2>
          <h3 className="ttl-01-sub font-en txt-ctr">
            <span className="txt">QUALITY MANAGEMENT</span>
          </h3>
        </div>

        <div className="contarea">
          <div className="cont--wrap cont-01 pos-rel">
            <Link href="/contact" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/quality-01.jpg"
                width="700"
                height="480"
                className="img-cover"
                alt="SBM GOLD Quality Inspector measuring uPVC profile dimensions with precision caliper"
              />
            </div>
            <div className="cont--wrap--inner">
              <h4 className="ttl font-en">ISO Certified Quality</h4>
              <p className="txt">
                Certified to ISO 9001:2015 &amp; ISO 4427. Caliper and wall-thickness checks on every batch keep each profile true to spec.
              </p>
              <span className="circle"></span>
            </div>
          </div>

          <div className="cont--wrap cont-02 pos-rel">
            <Link href="/contact" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/quality-02.jpg"
                width="700"
                height="220"
                className="img-cover"
                alt="SBM GOLD Automated Extrusion Lines and PLC Control Systems"
              />
            </div>
            <div className="cont--wrap--inner">
              <h4 className="ttl font-en">Automated Extrusion</h4>
              <p className="txt">PLC-controlled lines hold every profile wall uniform, metre after metre.</p>
              <span className="circle"></span>
            </div>
          </div>

          <div className="cont--wrap cont-03">
            <Link href="/contact" className="cont--link"></Link>
            <div className="cont--bg">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/quality-03.jpg"
                width="700"
                height="220"
                className="img-cover"
                alt="SBM GOLD Online Protective Film Lamination on uPVC Profile"
              />
            </div>
            <div className="cont--wrap--inner">
              <h4 className="ttl font-en">Protective Shield</h4>
              <p className="txt">Factory-applied film keeps profiles scratch-free from our plant to your site.</p>
              <span className="circle"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
