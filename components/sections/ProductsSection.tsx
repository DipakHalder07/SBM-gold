import ProductCards from "../ProductCards";
import { products, type Product } from "@/lib/products";

/** The home page product grid. Inner pages reuse it with their own title and products. */
export default function ProductsSection({
  title = "OUR PRODUCTS",
  items = products,
  id = "products",
}: {
  title?: string;
  items?: Product[];
  id?: string;
}) {
  return (
    <section id={id} className="home_products scroll_active">
      <div className="ttl-en">
        <img
          loading="lazy"
          decoding="async"
          src="/theme/images/top/products-ttl.svg"
          width="867"
          height="139"
          className="anime-fade-lft img-specif"
          alt="Products"
        />
      </div>

      <div className="inner inner-md">
        <div className="ttlarea">
          <h2 className="ttl ttl-01 txt-lft">
            <span className="ttl-txt block">{title}</span>
          </h2>
        </div>

        <ProductCards items={items} />
      </div>
    </section>
  );
}
