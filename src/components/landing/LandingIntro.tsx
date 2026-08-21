import { introContent } from '../../data/history'

export function LandingIntro() {
  return (
    <section className="lp-intro" data-year="intro">
      <div className="lp-intro__inner">
        <p className="lp-kicker lp-reveal">{introContent.label}</p>
        <h2 className="lp-intro__title lp-reveal">{introContent.title}</h2>
        <p className="lp-intro__body lp-reveal">{introContent.body}</p>
        <ul className="lp-intro__pillars">
          {introContent.pillars.map((pillar) => (
            <li className="lp-reveal" key={pillar.label}>
              <span>{pillar.label}</span>
              <strong>{pillar.text}</strong>
            </li>
          ))}
        </ul>
      </div>
      <figure className="lp-intro__figure lp-reveal">
        <img
          alt="Đại hội II năm 1951"
          className="lp-archival"
          loading="lazy"
          src="/1951/dai-hoi-ii.png"
        />
        <figcaption>1951 — Đại hội II · Nền tảng tổ chức và đường lối</figcaption>
      </figure>
    </section>
  )
}
