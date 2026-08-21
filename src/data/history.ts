export type HistoryImage = {
  src: string
  alt: string
  caption: string
}

export type HistoryYear = {
  id: string
  year: string
  title: string
  subtitle?: string
  date?: string
  summary: string
  points: string[]
  images: HistoryImage[]
  mapSrc?: string
}

export const siteBrand = {
  name: 'Dấu Ấn Điện Biên',
  period: '1951–1954',
  tagline: 'Một hành trình đến Điện Biên Phủ',
}

export const historicalTimeline: HistoryYear[] = [
  {
    id: '1951',
    year: '1951',
    title: 'Đại hội II',
    subtitle: 'Chiến dịch Hòa Bình',
    date: '11–19.02.1951 · 10.12.1951 – 25.02.1952',
    summary:
      'Đại hội II củng cố tổ chức lãnh đạo, đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam và xác định đường lối cách mạng dân tộc dân chủ nhân dân. Chiến dịch Hòa Bình mở đầu chuỗi chiến dịch lớn, giành thế chủ động trên chiến trường.',
    points: [
      'Đại hội họp tại Chiêm Hóa, Tuyên Quang (11–19.02.1951)',
      'Chính cương 1951 xác định nhiệm vụ giải phóng dân tộc',
      'Chiến dịch Hòa Bình: bước tập dượt quan trọng hướng tới Điện Biên Phủ',
    ],
    images: [
      {
        src: '/1951/dai-hoi-ii.png',
        alt: 'Đại hội đại biểu toàn quốc lần thứ II của Đảng năm 1951',
        caption: 'Đại hội II — Vinh Quang, Chiêm Hóa, Tuyên Quang',
      },
      {
        src: '/1951/cdhb.jpg',
        alt: 'Tư liệu Chiến dịch Hòa Bình',
        caption: 'Chiến dịch Hòa Bình — 10.12.1951 – 25.02.1952',
      },
    ],
  },
  {
    id: '1952',
    year: '1952',
    title: 'Chiến dịch Tây Bắc',
    subtitle: 'Mở rộng vùng giải phóng',
    date: '14.10 — 10.12.1952',
    summary:
      'Chiến dịch Tây Bắc mở rộng vùng giải phóng, tiêu diệt và tiêu hao sinh lực địch, tạo điều kiện cho chiến cuộc Đông Xuân 1953–1954. Đây là bước chuyển quan trọng về thế trận trên địa bàn chiến lược.',
    points: [
      'Bộ đội hành quân vượt sông, vượt đèo trên địa hình hiểm trở',
      'Tiến công các cứ điểm then chốt ở Tây Bắc',
      'Tạo bàn đạp cho các hướng tiến công tiếp theo',
    ],
    images: [
      {
        src: '/1952/ct-taybac.jpg',
        alt: 'Bộ đội trong Chiến dịch Tây Bắc năm 1952',
        caption: 'Chiến dịch Tây Bắc — hành quân và tiến công',
      },
      {
        src: '/1952/cdtb.jpg',
        alt: 'Tư liệu Chiến dịch Tây Bắc',
        caption: '14.10 — 10.12.1952',
      },
    ],
    mapSrc: '/1952/taybac-map.jpg',
  },
  {
    id: '1953',
    year: '1953',
    title: 'Đông Xuân 1953–1954',
    subtitle: 'Thượng Lào · Thế trận phân tán địch',
    date: 'Thu–Đông 1953 → Xuân 1954',
    summary:
      'Trước Kế hoạch Nava, Bộ Chính trị thông qua chủ trương tác chiến chiến lược Đông – Xuân 1953–1954: giữ vững thế chủ động, tiến công nhiều hướng, buộc địch phân tán lực lượng. Thế trận dần hội tụ về Điện Biên Phủ.',
    points: [
      'Đánh giá tình hình và xác định chủ trương Đông – Xuân',
      'Tiến công nhiều hướng: Lai Châu, Thượng Lào, Trung Lào…',
      'Buộc Pháp phân tán lực lượng — tạo thế cho Điện Biên Phủ',
    ],
    images: [
      {
        src: '/1953/dongxuan.jpg',
        alt: 'Chiến cuộc Đông Xuân 1953–1954',
        caption: 'Đông Xuân 1953–1954 — thế tiến công chiến lược',
      },
      {
        src: '/1953/thuonglao.jpg',
        alt: 'Chiến dịch Thượng Lào',
        caption: 'Thượng Lào — phối hợp chiến trường',
      },
      {
        src: '/1953/nghethuatquansu.jpg',
        alt: 'Nghệ thuật quân sự trong Đông Xuân 1953–1954',
        caption: 'Nghệ thuật tổ chức thế trận',
      },
    ],
    mapSrc: '/1953/thuoglaomap.jpg',
  },
  {
    id: '1954',
    year: '1954',
    title: 'Điện Biên Phủ',
    subtitle: 'Trận quyết chiến chiến lược',
    date: '13.03 — 07.05.1954',
    summary:
      'Chiến dịch Điện Biên Phủ là đỉnh cao của cuộc tiến công chiến lược Đông – Xuân. Sau 56 ngày đêm, ngày 7.5.1954 quân ta đánh chiếm sở chỉ huy, bắt sống tướng Đờ Cát — thắng lợi quyết định tạo điều kiện kết thúc chiến tranh bằng ngoại giao.',
    points: [
      '13.03.1954 — nổ súng mở màn chiến dịch',
      '56 ngày đêm — giao thông hào, pháo binh, tiến công cứ điểm',
      '07.05.1954 — chiến thắng Điện Biên Phủ',
    ],
    images: [
      {
        src: '/1954/dienbienphu.jpg',
        alt: 'Chiến trường Điện Biên Phủ năm 1954',
        caption: 'Điện Biên Phủ — tập đoàn cứ điểm',
      },
      {
        src: '/1954/chiendich-dbp.jpg',
        alt: 'Chiến dịch Điện Biên Phủ năm 1954',
        caption: '13.03 — 07.05.1954 · 56 ngày đêm',
      },
    ],
  },
]

export const victoryImage: HistoryImage = {
  src: '/1954/chienthang-dbp.jpg',
  alt: 'Chiến thắng Điện Biên Phủ ngày 7 tháng 5 năm 1954',
  caption: '07.05.1954 — Chiến thắng Điện Biên Phủ',
}

/** Celebration stills for the sticky stack on the victory section */
export const victoryCelebrationImages: HistoryImage[] = [
  {
    src: '/1954/ct-dienbienphu2.jpg',
    alt: 'Bộ đội ăn mừng trên xe tăng sau chiến thắng Điện Biên Phủ',
    caption: 'Ăn mừng chiến thắng trên chiến trường',
  },
  {
    src: '/1954/ct-dienbienphu.jpg',
    alt: 'Cờ Quyết thắng trên nóc hầm Đờ Cát',
    caption: 'Cờ Quyết thắng trên hầm chỉ huy',
  },
  {
    src: '/1954/ct-dienbienphu3.jpeg',
    alt: 'Bộ đội vui mừng trong chiến hào Điện Biên Phủ',
    caption: 'Niềm vui trong chiến hào',
  },
  {
    src: '/1954/ct-dienbienphu4.png',
    alt: 'Quần chúng và bộ đội ăn mừng chiến thắng Điện Biên Phủ',
    caption: 'Toàn dân vui mừng chiến thắng',
  },
]


export const introContent = {
  label: 'Giai đoạn quyết định',
  title: 'Từ củng cố đường lối đến thắng lợi Điện Biên',
  body: 'Giai đoạn 1951–1954 là thời kỳ kháng chiến chống thực dân Pháp được đẩy mạnh. Từ Đại hội II củng cố tổ chức và đường lối, qua các chiến dịch Hòa Bình, Tây Bắc, Đông Xuân 1953–1954, đến Điện Biên Phủ — đỉnh cao của cuộc tiến công chiến lược.',
  pillars: [
    { label: 'Tổ chức', text: 'Đại hội II · Đảng Lao động Việt Nam' },
    { label: 'Chiến lược', text: 'Đông – Xuân 1953–1954' },
    { label: 'Nguồn lực', text: 'Hậu phương chi viện tiền tuyến' },
  ],
}
