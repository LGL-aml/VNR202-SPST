import { landingReferences } from '../../data/history'

export function LandingReferences() {
  return (
    <section className="lp-references" aria-labelledby="lp-references-title" id="tai-lieu-tham-khao">
      <div className="lp-references__inner">
        <p className="lp-kicker lp-reveal">Nguồn tư liệu</p>
        <h2 className="lp-reveal" id="lp-references-title">
          Tài liệu tham khảo
        </h2>
        <ol className="lp-references__list">
          {landingReferences.map((item) => (
            <li className="lp-reveal" key={item.id}>
              {item.href ? (
                <a href={item.href} rel="noopener noreferrer" target="_blank">
                  {item.citation}
                </a>
              ) : (
                <span>{item.citation}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
