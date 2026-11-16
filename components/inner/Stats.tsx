const STATS = [
  { value: "10+", label: "Years of extrusion expertise" },
  { value: "22,000 MT", label: "Yearly manufacturing capacity" },
  { value: "2,25,000", label: "Sq ft manufacturing facility" },
  { value: "300+", label: "Dealers in our network" },
];

/** Maroon band of key numbers, in the style of the home page's About section. */
export default function Stats() {
  return (
    <section className="ip-statband bg-primary-dark clr-wht scroll_active">
      <div className="ip-wrap">
        <ul className="ip-stats">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
