export function StrategicMap1953() {
  return (
    <section className="lp-strategy" data-year="1953-map" id="strategy-1953">
      <div className="lp-strategy__copy">
        <p className="lp-kicker lp-reveal">Thế trận Đông Xuân</p>
        <h2 className="lp-reveal">Phân tán lực lượng địch</h2>
        <p className="lp-reveal">
          Các hướng tiến công xuất hiện lần lượt — Tây Bắc, Thượng Lào, Trung Lào — buộc Pháp phân tán binh lực,
          trong khi thế trận dần hội tụ về Điện Biên.
        </p>
      </div>

      <div className="lp-strategy__stage lp-reveal" aria-label="Bản đồ chiến lược Đông Xuân 1953–1954">
        <svg className="lp-strategy__svg" viewBox="0 0 640 520" role="img">
          <title>Sơ đồ hướng tiến công Đông Xuân 1953–1954</title>
          <rect fill="#26382D" height="520" rx="2" width="640" x="0" y="0" />
          <g fill="none" opacity="0.35" stroke="#B9975B" strokeWidth="1">
            <path d="M80 60 H560 V460 H80 Z" />
            <path d="M120 100 H520 V420 H120 Z" />
          </g>

          <circle className="lp-strategy__node" cx="320" cy="120" fill="#B9975B" r="7" />
          <text fill="#E8E1D3" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="1.5" textAnchor="middle" x="320" y="98">
            ĐIỆN BIÊN
          </text>

          <circle className="lp-strategy__node" cx="180" cy="240" fill="#E8E1D3" r="5" />
          <text fill="#E8E1D3" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="1" textAnchor="middle" x="180" y="270">
            TÂY BẮC
          </text>

          <circle className="lp-strategy__node" cx="460" cy="220" fill="#E8E1D3" r="5" />
          <text fill="#E8E1D3" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="1" textAnchor="middle" x="460" y="250">
            THƯỢNG LÀO
          </text>

          <circle className="lp-strategy__node" cx="340" cy="380" fill="#E8E1D3" r="5" />
          <text fill="#E8E1D3" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="1" textAnchor="middle" x="340" y="410">
            TRUNG LÀO
          </text>

          <path
            className="lp-route lp-route--1"
            d="M180 240 C220 200, 280 150, 320 120"
            fill="none"
            stroke="#B9975B"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <path
            className="lp-route lp-route--2"
            d="M460 220 C420 180, 360 140, 320 120"
            fill="none"
            stroke="#B9975B"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <path
            className="lp-route lp-route--3"
            d="M340 380 C340 300, 330 180, 320 120"
            fill="none"
            stroke="#5E211B"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </svg>
        <figure className="lp-strategy__photo">
          <img alt="Bản đồ Thượng Lào" className="lp-archival" loading="lazy" src="/1953/thuoglaomap.jpg" />
          <figcaption>Bản đồ chiến lược · Thượng Lào</figcaption>
        </figure>
      </div>
    </section>
  )
}
