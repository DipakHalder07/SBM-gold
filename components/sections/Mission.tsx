
export default function Mission() {
  return (
    <section className="home_mission scroll_active">
      <div className="bg"></div>
      <div className="inner">
        <h4 className="sub-ttl anime-fade-up">OUR MISSION</h4>
        <h3 className="ttl ttl-02 txt-ctr anime-fade-up delay1">
          <span className="block">
            &ldquo;Bringing nature&rsquo;s serenity&rdquo;<br />
            straight to you with<br />
            <span className="txt-lg">Doors</span> &amp; <span className="txt-lg">Windows</span>.
          </span>
        </h3>
        <div className="txt anime-fade-up delay2">
          <p>
            From humble beginnings at SBM Plaza to a trusted name in building materials.<br />
            Crafting durable, precision-engineered uPVC profiles and plumbing solutions for every Indian home.
          </p>
        </div>
      </div>

      <span className="deco deco-1 fill blue xs anime-diag-rgt2 delay1">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>
      <span className="deco deco-2 stroke blue lg anime-diag-rgt delay2">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>
      <span className="deco deco-3 stroke blue lg anime-diag-rgt">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>
      <span className="deco deco-4 fill wht sm anime-diag-rgt2 delay1">
        <svg width="100%" height="100%" viewBox="0 0 342 388" fill="none">
          <path d="M273.68 0.5L0.96405 387.5H68.3158L341.036 0.5H273.68Z" />
        </svg>
      </span>

      {/* Seamless Infinite Scrolling Gallery */}
      <div className="imgarea scroll-img">
        <div className="scroll-img--list flex">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="img pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src={`/images/sbm/gallery-0${num}.jpg?v=3`}
                width="640"
                height="427"
                className="img-cover"
                alt="SBM GOLD Manufacturing and Product Gallery"
              />
            </div>
          ))}
          {/* Repetition for continuous loop */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={`dup-${num}`} className="img pos-rel">
              <img
                loading="lazy"
                decoding="async"
                src={`/images/sbm/gallery-0${num}.jpg?v=3`}
                width="640"
                height="427"
                className="img-cover"
                alt="SBM GOLD Manufacturing and Product Gallery"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
