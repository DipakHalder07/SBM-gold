import Link from "next/link";

export default function Milestones() {
  return (
    <section id="news" className="home_news">
      <div className="inner inner-lg">
        <div className="home_news--wrap flex flex-sp-block">
          <div className="ttlarea">
            <h2 className="ttl ttl-01 txt-lft">
              <span className="jp block">MILESTONES</span>
            </h2>
            <div className="btn btn-arrow">
              <Link href="https://www.instagram.com/sbmgold_/" target="_blank" rel="noopener noreferrer">
                <span className="txt--wrap">Follow @sbmgold_</span>
                <span className="circle"></span>
              </Link>
            </div>
          </div>
          <div className="posts posts-news">
            <article className="post">
              <div className="post--info flex flex-c-wrap flex-a-ctr">
                <p className="post--date">2025</p>
                <div className="cat_list">
                  <span className="tag">Launch</span>
                </div>
              </div>
              <div className="post--txtarea">
                <h2 className="post--ttl">
                  <Link href="#news" className="post--link">
                    Launched uPVC profiles for windows &amp; doors and WPC door frames
                  </Link>
                </h2>
                <span className="circle"></span>
              </div>
            </article>

            <article className="post">
              <div className="post--info flex flex-c-wrap flex-a-ctr">
                <p className="post--date">2023</p>
                <div className="cat_list">
                  <span className="tag">Milestone</span>
                </div>
              </div>
              <div className="post--txtarea">
                <h2 className="post--ttl">
                  <Link href="#news" className="post--link">
                    First company in North East India to manufacture 450mm HDPE pipes
                  </Link>
                </h2>
                <span className="circle"></span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
