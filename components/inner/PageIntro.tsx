import Breadcrumb, { type Crumb } from "../Breadcrumb";

/** Inner page banner: diagonal red panel over a red-tinted photo, with an outlined title. */
export default function PageIntro({
  word,
  title,
  crumbs,
  image,
  lead,
}: {
  /** Large outlined word, e.g. "Products". */
  word: string;
  /** The page's real heading, shown below the outlined word. */
  title: string;
  crumbs: Crumb[];
  image: string;
  lead?: string;
}) {
  return (
    <>
      <header className="ip-hero">
        <div className="ip-hero--photo">
          <img src={image} alt="" width="1600" height="600" fetchPriority="high" />
        </div>
        <div className="ip-hero--panel"></div>
        {/* A text stroke would also trace the overlapping shapes inside the font's letters */}
        <svg className="ip-hero--filter" aria-hidden="true" width="0" height="0">
          <filter id="ip-outline">
            <feMorphology in="SourceAlpha" operator="erode" radius="1" result="inner" />
            <feComposite in="SourceGraphic" in2="inner" operator="out" />
          </filter>
        </svg>
        <div className="ip-wrap ip-hero--cont">
          <p className="ip-hero--word" aria-hidden="true">
            {word}
          </p>
          <h1>{title}</h1>
          <Breadcrumb items={crumbs} />
        </div>
      </header>

      {lead && (
        <div className="ip-intro">
          <div className="ip-wrap">
            <p className="ip-lead">{lead}</p>
          </div>
        </div>
      )}
    </>
  );
}
