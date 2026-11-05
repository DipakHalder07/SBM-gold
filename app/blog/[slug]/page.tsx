import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import BlogCard from "@/components/inner/BlogCard";
import CtaBand from "@/components/inner/CtaBand";
import PageIntro from "@/components/inner/PageIntro";
import Section from "@/components/inner/Section";
import { getOtherPosts, getPost, posts, readingTime } from "@/lib/blog";
import { getProduct } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMetadata(post.title, post.excerpt, `/blog/${post.slug}`, post.image);
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const product = getProduct(post.product);

  return (
    <SiteLayout variant="inner">
      <PageIntro
        word="Blog"
        title={post.title}
        image="/images/sbm/gallery-02.jpg"
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      />

      <div className="ip-wrap ip-article">
        <aside className="ip-article--side">
          <dl className="ip-facts ip-facts--stack">
            <div>
              <dt>Topic</dt>
              <dd>{post.category}</dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{readingTime(post)}</dd>
            </div>
            {product && (
              <div>
                <dt>Related product</dt>
                <dd>
                  <Link className="ip-link" href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <article className="ip-article--body">
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
        </article>
      </div>

      <Section title="More articles">
        <div className="ip-tiles ip-tiles--three">
          {getOtherPosts(post).map((other) => (
            <BlogCard key={other.slug} post={other} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a question?"
        text="Tell us about your project and our team will help you find the right product."
        href={product ? `/contact?product=${product.slug}#inquiry` : "/contact"}
      />
    </SiteLayout>
  );
}
