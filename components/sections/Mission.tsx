
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
