
export default function Quality() {
  return (
    <section id="quality" className="home_quality scroll_active">
      <div className="inner inner-md">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-ctr">
            <span className="ttl-txt block">QUALITY CONTROL</span>
          </h2>
        </div>

        <div className="contarea">
          <div className="cont--wrap cont-01 pos-rel">
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
            </div>
          </div>

          <div className="cont--wrap cont-02 pos-rel">
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
            </div>
          </div>

          <div className="cont--wrap cont-03">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
