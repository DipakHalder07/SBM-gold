import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import BlogCard from "@/components/inner/BlogCard";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/seo";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import { getOtherPosts, getPost, posts, readingTime } from "@/lib/blog";
import { getProduct } from "@/lib/products";
import { CONTACT, pageMetadata } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMetadata(post.title, post.excerpt, `/blog/${post.slug}`, post.image, {
    type: "article",
    imageAlt: post.imageAlt,
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const product = getProduct(post.product);

  return (
    <SiteLayout variant="inner">
      <JsonLd data={articleSchema(post)} />
      <PageIntro
        word="Blog"
        title={post.title}
        image="/images/sbm/gallery-02.jpg"
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      />

      <div className="ip-wrap ip-article">
        <article className="ip-article--body">
          {/* topic, reading time and a way back, above the photo */}
          <div className="ip-article--meta">
            <span className="ip-tile--cat">{post.category}</span>
            <span className="ip-tile--time">{readingTime(post)}</span>
            <Link href="/blog" className="ip-article--back">
              All articles
            </Link>
          </div>

          <div className="ip-article--img">
            <img src={post.image} width="1200" height="800" alt={post.imageAlt} fetchPriority="high" />
          </div>
          <p className="ip-article--lead">{post.excerpt}</p>
          {post.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}

          {/* the product this article is about, with the next step */}
          {product && (
            <aside className="ip-article--product">
              <img loading="lazy" decoding="async" src={product.image} width="398" height="266" alt={product.imageAlt} />
              <div>
                <p className="ip-eyebrow">Related product</p>
                <p className="ip-article--pname">{product.name}</p>
                <div className="ip-actions">
                  <Link href={`/products/${product.slug}`} className="ip-btn">
                    View Product
                  </Link>
                  <Link href={`/contact?product=${product.slug}#inquiry`} className="ip-btn ip-btn--ghost">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </aside>
          )}

          <p className="ip-article--help">
            Have a question about your project? Call us toll free on{" "}
            <a href={CONTACT.tollFreeHref}>{CONTACT.tollFree}</a>.
          </p>
        </article>
      </div>

      <Section title="More articles" tone="grey" plain>
        <div className="ip-tiles ip-tiles--three">
          {getOtherPosts(post).map((other) => (
            <BlogCard key={other.slug} post={other} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
