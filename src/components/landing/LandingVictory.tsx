import { Link } from 'react-router-dom'
import { Icon } from '../common/Icon'
import { victoryCelebrationImages } from '../../data/history'
import { StickyVictoryCards } from './StickyVictoryCards'

export function LandingVictory() {
  return (
    <section className="lp-victory" data-year="victory" id="victory">
      <StickyVictoryCards cards={victoryCelebrationImages} />

      <div className="lp-victory__copy">
        <p className="lp-kicker lp-reveal">Cao trào</p>
        <h2 className="lp-reveal">
          Chiến thắng
          <br />
          Điện Biên Phủ
        </h2>
        <p className="lp-reveal">
          Thắng lợi quân sự tạo điều kiện thuận lợi cho đấu tranh ngoại giao. Ngày 21.7.1954, Hiệp định Giơnevơ
          ghi nhận các quyền dân tộc cơ bản của Việt Nam, Lào và Campuchia.
        </p>
      </div>
    </section>
  )
}

export function LandingConclusion() {
  return (
    <section className="lp-conclusion" data-year="end">
      <div className="lp-conclusion__years lp-reveal" aria-hidden="true">
        <span>1951</span>
        <span>1952</span>
        <span>1953</span>
        <span>1954</span>
      </div>
      <h2 className="lp-reveal">
        Một hành trình.
        <br />
        Một bước ngoặt.
        <br />
        Một chiến thắng mang ý nghĩa lịch sử.
      </h2>
      <p className="lp-reveal">
        Tiếp tục khám phá lý thuyết về tổ chức, chiến lược và nguồn lực — rồi củng cố kiến thức qua trò chơi tương tác.
      </p>
      <div className="lp-conclusion__actions lp-reveal">
        <Link className="button" to="/theory">
          <Icon name="menu_book" /> Khám phá lý thuyết
        </Link>
        <Link className="button button--secondary" to="/game">
          <Icon name="sports_esports" /> Bắt đầu trò chơi
        </Link>
      </div>
    </section>
  )
}
