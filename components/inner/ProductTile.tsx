import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductTile({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="ip-tile">
      <span className="ip-tile--img">
        <img loading="lazy" decoding="async" src={product.image} width="796" height="532" alt={product.imageAlt} />
      </span>
      <span className="ip-tile--name">{product.name}</span>
      <span className="ip-tile--text">{product.tagline}</span>
      <span className="ip-link">View details</span>
    </Link>
  );
}
