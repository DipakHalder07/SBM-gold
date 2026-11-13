"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { productCategories, products, type ProductCategory } from "@/lib/products";

type Filter = "All" | ProductCategory;

/** Product grid with category buttons, so visitors can narrow the list. */
export default function ProductBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...productCategories];
  const shown = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="ip-filter" role="group" aria-label="Filter products by category">
        {filters.map((item) => {
          const count = item === "All" ? products.length : products.filter((p) => p.category === item).length;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "is-active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="ip-tiles ip-tiles--three">
        {shown.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
