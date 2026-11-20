import Link from "next/link";
import { posts } from "@/lib/blog";

export default function BlogSection() {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="home_news pos-rel">
      <span id="news" className="pos-abs" style={{ top: "-100px" }}></span>
      <div className="inner inner-lg">
        <div className="home_news--wrap flex flex-sp-block">
          <div className="ttlarea">
            <h2 className="ttl ttl-01 txt-lft">
              <span className="ttl-txt block">BLOG</span>
            </h2>
            <div className="btn btn-arrow">
              <Link href="/blog">
                <span className="txt--wrap">View All Articles</span>
                <span className="circle"></span>
              </Link>
            </div>
          </div>
          <div className="posts posts-news">
            {latestPosts.map((post) => (
              <article key={post.slug} className="post">
                <div className="post--info flex flex-c-wrap flex-a-ctr">
                  <p className="post--date">{post.date}</p>
                  <div className="cat_list">
                    <span className="tag">{post.category}</span>
                  </div>
                </div>
                <div className="post--txtarea pos-rel">
                  <h3 className="post--ttl">
                    <Link href={`/blog/${post.slug}`} className="post--link">
                      {post.title}
                    </Link>
                  </h3>
                  <span className="circle"></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

