import Link from "next/link";

export default function Strengths() {
  return (
    <section id="feature" className="home_feature section_pdg scroll_active">
      <div className="inner inner-lg">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-ctr">
            <span className="ttl-txt block">OUR STRENGTHS</span>
          </h2>
        </div>

        <div className="contarea">
          {/* Feature 01 */}
          <div className="cont--wrap cont-01 pos-rel flex">
            <div className="imgarea pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/feature-01.jpg?v=2"
                width="800"
                height="600"
                className="img-cover"
                alt="uPVC window profiles designed to European standards - SBM GOLD"
              />
            </div>
            <div className="txtarea">
              <h4 className="ttl flex flex-a-ctr font-en">
                <span className="num-decoration font-en flex flex-column flex-a-ctr">
                  <span className="txt">FEATURE</span>
                  <span className="num">01</span>
                </span>
                uPVC Profiles:<br />German Technology, Indian Strength
              </h4>
              <p className="txt">
                Multi-chambered profiles built to European standards, available in Oak Wood, Walnut, Black, White and Grey.
              </p>
            </div>
            <span className="dots-list pos-ab">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>

          {/* Feature 02 */}
          <div className="cont--wrap cont-02 pos-rel flex">
            <div className="imgarea pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/feature-02.jpg?v=2"
                width="800"
                height="600"
                className="img-cover"
                alt="SBM GOLD water tanks and piping systems"
              />
            </div>
            <div className="txtarea">
              <h4 className="ttl flex flex-a-ctr font-en">
                <span className="num-decoration font-en flex flex-column flex-a-ctr">
                  <span className="txt">FEATURE</span>
                  <span className="num">02</span>
                </span>
                uPVC Windows &amp; Doors:<br />Built for Every Weather
              </h4>
              <p className="txt">
                Termite-proof and weather-sealed, with better noise and heat insulation, advanced locking and a 20-year warranty.
              </p>
            </div>
            <span className="dots-list pos-ab">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>

          {/* Feature 03 */}
          <div className="cont--wrap cont-03 pos-rel flex">
            <div className="imgarea pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/feature-03.jpg"
                width="800"
                height="600"
                className="img-cover"
                alt="Wood-finish uPVC window overlooking hills at sunset"
              />
            </div>
            <div className="txtarea">
              <h4 className="ttl flex flex-a-ctr font-en">
                <span className="num-decoration font-en flex flex-column flex-a-ctr">
                  <span className="txt">FEATURE</span>
                  <span className="num">03</span>
                </span>
                Water Tanks:<br />Pure Water, Layer by Layer
              </h4>
              <p className="txt">
                Food-grade, UV-resistant and anti-bacterial tanks from 100L to 10,000L, with up to 4 layers and ISI marking.
              </p>
              <div className="btn">
                <Link href="#quality">Learn About Quality Control</Link>
              </div>
            </div>
            <span className="dots-list pos-ab">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>

          {/* Feature 04 */}
          <div className="cont--wrap cont-04 pos-rel flex">
            <div className="imgarea pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/feature-04.jpg"
                width="800"
                height="600"
                className="img-cover"
                alt="uPVC sliding doors opening onto a dining room"
              />
            </div>
            <div className="txtarea">
              <h4 className="ttl flex flex-a-ctr font-en">
                <span className="num-decoration font-en flex flex-column flex-a-ctr">
                  <span className="txt">FEATURE</span>
                  <span className="num">04</span>
                </span>
                Pipes:<br />From Homes to Fields
              </h4>
              <p className="txt">
                From your home’s plumbing to farm irrigation and city water lines, SBM GOLD pipes deliver leak-proof, long-lasting flow.
              </p>
              <div className="btn">
                <Link href="/products">Explore Our Range</Link>
              </div>
            </div>
            <span className="dots-list pos-ab">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>

          {/* Feature 05 */}
          <div className="cont--wrap cont-05 pos-rel flex">
            <div className="imgarea pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src="/images/sbm/feature-05.jpg"
                width="800"
                height="600"
                className="img-cover"
                alt="White uPVC windows and doors on a home veranda"
              />
            </div>
            <div className="txtarea">
              <h4 className="ttl flex flex-a-ctr font-en">
                <span className="num-decoration font-en flex flex-column flex-a-ctr">
                  <span className="txt">FEATURE</span>
                  <span className="num">05</span>
                </span>
                Wall Putty: The Perfect Base for Every Wall
              </h4>
              <p className="txt">
                A smooth, strong finish that helps paint look better and last longer.
              </p>
              <div className="btn">
                <Link href="/contact">Talk to Our Team</Link>
              </div>
            </div>
            <span className="dots-list pos-ab">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
