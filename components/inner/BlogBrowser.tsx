"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import { posts } from "@/lib/blog";

const ALL = "All";

/** Blog list with topic buttons. "All" leads with the newest article as a wide card. */
export default function BlogBrowser() {
  const [topic, setTopic] = useState(ALL);
  const topics = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))];
  const shown = topic === ALL ? posts : posts.filter((p) => p.category === topic);
  const [featured, ...rest] = shown;
  const showFeatured = topic === ALL;

  return (
    <>
      <div className="ip-filter" role="group" aria-label="Filter articles by topic">
        {topics.map((item) => {
          const count = item === ALL ? posts.length : posts.filter((p) => p.category === item).length;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              className={topic === item ? "is-active" : ""}
              onClick={() => setTopic(item)}
            >
              {item}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      {showFeatured && featured && <BlogCard post={featured} featured />}

      <div className={`ip-tiles ip-tiles--three ${showFeatured ? "ip-blog--grid" : ""}`}>
        {(showFeatured ? rest : shown).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
