import Link from "next/link";
import { readingTime, type BlogPost } from "@/lib/blog";

export default function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`ip-tile ${featured ? "ip-tile--featured" : ""}`}>
      <span className="ip-tile--img">
        <img loading="lazy" decoding="async" src={post.image} width="796" height="532" alt={post.imageAlt} />
        {featured && <span className="ip-tile--badge">Featured</span>}
      </span>
      <span className="ip-tile--body">
        <span className="ip-tile--meta">
          <span className="ip-tile--cat">{post.category}</span>
          <span className="ip-tile--time">{readingTime(post)}</span>
        </span>
        <span className="ip-tile--name">{post.title}</span>
        <span className="ip-tile--text">{post.excerpt}</span>
        <span className="ip-link">Read article</span>
      </span>
    </Link>
  );
}
