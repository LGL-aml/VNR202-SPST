export function LandingHero() {
  return (
    <section className="lp-hero" data-year="hero">
      <div className="lp-hero__bg" aria-hidden="true">
        <div className="lp-hero__grain" />
        <div className="lp-hero__map-lines" />
      </div>
      <div className="lp-hero__content">
        <p className="lp-hero__label lp-reveal">Dấu Ấn Điện Biên</p>
        <p className="lp-hero__years lp-reveal">1951 — 1954</p>
        <h1 className="lp-hero__title">
          <span className="lp-reveal">Một hành trình</span>
          <span className="lp-reveal">đến Điện Biên Phủ</span>
        </h1>
        <p className="lp-hero__subtitle lp-reveal">
          Từ Đại hội II đến chiến thắng quyết định — kể bằng bản đồ, tư liệu và chuyển động của lịch sử.
        </p>
        <div className="lp-hero__scroll lp-reveal" aria-hidden="true">
          <span>Cuộn để khám phá</span>
          <span className="lp-hero__scroll-line" />
        </div>
      </div>
    </section>
  )
}
