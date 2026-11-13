import Link from "next/link";
import { CONTACT } from "@/lib/site";
import FooterNav from "./FooterNav";

export default function SiteFooter() {
  return (
    <footer id="footer" className="footer">
      <div className="bg"></div>
      <div className="inner inner-lg">
        <div className="footer_top clr-wht">
          <div className="flex flex-j-between flex-sp-block">
            <div className="footer--info">
              <h2 className="footer--logo">
                <Link href="/">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="/images/logo/sbm-gold-logo-stacked-white.png"
                    width="622"
                    height="454"
                    alt="SBM GOLD"
                  />
                </Link>
              </h2>
              <address className="footer--address">
                <p>{CONTACT.company}</p>
                <p>{CONTACT.address}</p>
              </address>
              <p className="footer--tel">
                TOLL FREE:<a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>
                <br />
                EMAIL:<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
              <aside className="sns_area">
                <ul className="flex flex-a-ctr">
                  <li>
                    <a
                      className="instagram"
                      href={CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SBM GOLD on Instagram"
                    >
                      <svg className="icon-instagram">
                        <use xlinkHref="#icon-instagram"></use>
                      </svg>
                    </a>
                  </li>
                </ul>
              </aside>
            </div>

            <FooterNav />
          </div>
        </div>
      </div>

      <div className="inner inner-lg">
        <div className="footer_btm flex flex-a-ctr flex-j-between flex-sp-block">
          <div className="footer_btm--lft">
            <ul className="footer_btm--menu flex">
              <li>
                <Link href="/about#news">Milestones</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/sitemap">Sitemap</Link>
              </li>
            </ul>
            <div className="copyright flex flex-a-ctr flex-sp-block font-en">
              <small>&copy; SBM GOLD ALL RIGHTS RESERVED.</small>
            </div>
          </div>
          <div className="footer_btm--rgt">
            <ul className="footer--cta flex flex-sp-block">
              <li className="footer--contact cta_contact">
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
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
