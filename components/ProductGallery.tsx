"use client";

import { useState } from "react";

type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="ip-gallery">
      <div className="ip-gallery--main">
        <img src={current.src} alt={current.alt} width="796" height="532" fetchPriority="high" />
      </div>
      {images.length > 1 && (
        <ul className="ip-gallery--thumbs">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                className={i === active ? "active" : ""}
                aria-label={`Show photo ${i + 1}: ${image.alt}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <img src={image.src} alt="" width="160" height="107" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
