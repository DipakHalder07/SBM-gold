import Link from "next/link";

export default function FootCta() {
  return (
    <section id="contact" className="foot_cta pos-rel">
      <div className="inner flex flex-j-between flex-sp-block">
        <div className="foot_cta--ttl">
          <h2 className="ttl ttl-01 font-en txt-lft">
            <span className="jp block">CONTACT US</span>
          </h2>
          <p className="txt foot_cta--copy">
            <span className="foot_cta_line">Get in touch with the future of doors &amp; windows.</span>
            <span className="foot_cta_line">For uPVC windows and doors, WPC door frames, water tanks, pipes and wall putty, talk to SBM GOLD.</span>
            <span className="foot_cta_line">Builders, dealers and homeowners are all welcome: Yahi Hai #AsliCommitment.</span>
          </p>
        </div>
        <div className="foot_cta--contact pos-rel">
          <ul>
            <li className="cta_contact">
              <Link href="/contact">
                <svg
                  className="img-specif"
                  width="41"
                  height="32"
                  viewBox="0 0 41 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.75 32C3.65 32 2.70833 31.6083 1.925 30.825C1.14167 30.0417 0.75 29.1 0.75 28V4C0.75 2.9 1.14167 1.95833 1.925 1.175C2.70833 0.391667 3.65 0 4.75 0H36.75C37.85 0 38.7917 0.391667 39.575 1.175C40.3583 1.95833 40.75 2.9 40.75 4V28C40.75 29.1 40.3583 30.0417 39.575 30.825C38.7917 31.6083 37.85 32 36.75 32H4.75ZM20.75 18L4.75 8V28H36.75V8L20.75 18ZM20.75 14L36.75 4H4.75L20.75 14ZM4.75 8V4V28V8Z" />
                </svg>
                <span>CONTACT</span>
              </Link>
            </li>
            <li className="cta_tel">
              <a href="tel:18008893850">
                <span className="tel">
                  TEL.<span className="num">1800-8893-850</span>
                </span>
                <span className="hours">Toll-free customer support</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="scroll-txt">
        <div className="scroll-txt--cont flex flex-a-ctr">
          <img
              loading="lazy"
              decoding="async"
            src="/theme/images/common/deco-txt-gray.svg?v=4"
            width="4590"
            height="183"
            alt=""
          />
          <img
              loading="lazy"
              decoding="async"
            src="/theme/images/common/deco-txt-gray.svg?v=4"
            width="4590"
            height="183"
            alt=""
          />
          <img
              loading="lazy"
              decoding="async"
            src="/theme/images/common/deco-txt-gray.svg?v=4"
            width="4590"
            height="183"
            alt=""
          />
          <img
              loading="lazy"
              decoding="async"
            src="/theme/images/common/deco-txt-gray.svg?v=4"
            width="4590"
            height="183"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
