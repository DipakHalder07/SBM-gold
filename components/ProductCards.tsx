import Link from "next/link";
import type { Product } from "@/lib/products";

/** Product cards. Needs a `.home_products` ancestor for its styling. */
export default function ProductCards({ items, numbered = true }: { items: Product[]; numbered?: boolean }) {
  return (
    <div className="contarea">
      {items.map((product, i) => (
        <div key={product.slug} className={`cont--wrap cont-0${(i % 3) + 1} pos-rel`}>
          {numbered && <span className="num font-en">{String(i + 1).padStart(2, "0")}</span>}
          <Link href={`/products/${product.slug}`} className="cont--link" aria-label={product.name}></Link>
          <div className="imgarea">
            <img loading="lazy" decoding="async" src={product.image} width="398" height="266" alt={product.imageAlt} />
          </div>
          <div className="txtarea">
            <h4 className="ttl font-en">
              {product.name}
              <span className="arrow"></span>
            </h4>
            <div className="txt">{product.short}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
