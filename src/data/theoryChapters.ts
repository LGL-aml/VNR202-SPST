export type TheorySection = {
  id: string
  title: string
  paragraphs: string[]
  highlights?: string[]
}

export type TheoryChapter = {
  slug: string
  number: string
  period: string
  title: string
  summary: string
  image: string
  imageAlt: string
  documentLabel: string
  facts: Array<{ label: string; value: string }>
  sections: TheorySection[]
  keyPoints: Array<{ title: string; body: string }>
}

export const theoryChapters: TheoryChapter[] = [
  {
    slug: 'dai-hoi-ii',
    number: '01',
    period: '1951',
    title: 'Đại hội II và Chính cương 1951',
    summary: 'Tổ chức lại phương thức hoạt động của Đảng và xác lập đường lối cách mạng dân tộc dân chủ nhân dân.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD1sgrnvLBAFbpn2My3dRLVnB2wQOKsapWeH4neEVLWec3Xq5lP8vLEBwXXXJeBtCz9mtKvLWG-Dd35_SUFd5bCRFTCcTEXbI6Cs2KEU2uUOvMMhq4EKFO-5TYYlfG36bYACiCxMwx2FRlqGF0slC2IVasRVpVMVE3BFJb2HKNafETDi1sosXNNRQwWxj_n485teQXTMNuuIdVSRg4ueUHZKqNJ6S0HjsfJwzgdN6HxNQhMMgFePc3',
    imageAlt: 'Tư liệu về Đại hội đại biểu toàn quốc lần thứ II của Đảng',
    documentLabel: 'Hồ sơ Đại hội II',
    facts: [
      { label: 'Thời gian', value: '11–19/2/1951' },
      { label: 'Địa điểm', value: 'Tuyên Quang' },
      { label: 'Tên công khai', value: 'Đảng Lao động Việt Nam' },
      { label: 'Lãnh đạo', value: 'Hồ Chí Minh – Trường Chinh' },
    ],
    sections: [
      {
        id: 'dai-hoi-dai-bieu-toan-quoc-lan-ii',
        title: 'Đại hội Đại biểu toàn quốc lần thứ II (1951)',
        paragraphs: [
          'Đại hội đại biểu toàn quốc lần thứ II của Đảng họp từ ngày 11 đến 19-2-1951 tại Tuyên Quang, trong bối cảnh cuộc kháng chiến chống thực dân Pháp đang phát triển và yêu cầu tăng cường sự lãnh đạo của Đảng ngày càng đặt ra cấp thiết.',
          'Đại hội quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam, đồng thời xác định tổ chức cách mạng ở mỗi nước Đông Dương cần phù hợp với điều kiện cụ thể của từng dân tộc.',
          'Đại hội kiện toàn tổ chức lãnh đạo của Đảng, bầu Ban Chấp hành Trung ương gồm 29 ủy viên, Hồ Chí Minh làm Chủ tịch Đảng và Trường Chinh làm Tổng Bí thư. Những quyết định về tổ chức và phương thức hoạt động nhằm tăng cường năng lực lãnh đạo, đáp ứng yêu cầu của cuộc kháng chiến trong tình hình mới.',
        ],
        highlights: ['11–19/2/1951', 'Đảng Lao động Việt Nam', '29 ủy viên Trung ương'],
      },
      {
        id: 'chinh-cuong-dang-lao-dong-viet-nam',
        title: 'Chính cương Đảng Lao động Việt Nam (1951)',
        paragraphs: [
          'Trên cơ sở Báo cáo Chính trị của Trường Chinh, Đại hội II thông qua Chính cương Đảng Lao động Việt Nam, trình bày đường lối cách mạng dân tộc dân chủ nhân dân tiến lên chủ nghĩa xã hội.',
          'Chính cương xác định xã hội Việt Nam lúc đó có ba tính chất: dân chủ nhân dân, một phần thuộc địa và nửa phong kiến. Đây là cơ sở để xác định đối tượng đấu tranh và những nhiệm vụ cơ bản của cách mạng.',
          'Nhiệm vụ của cách mạng là đánh đuổi đế quốc xâm lược, giành độc lập và thống nhất thật sự cho dân tộc; xóa bỏ những tàn tích phong kiến và nửa phong kiến, làm cho người cày có ruộng; phát triển chế độ dân chủ nhân dân, tạo cơ sở cho chủ nghĩa xã hội. Nhiệm vụ trước mắt là tập trung chống xâm lược, hoàn thành giải phóng dân tộc.',
          'Động lực cách mạng gồm giai cấp công nhân, nông dân, tiểu tư sản và tư sản dân tộc, cùng những lực lượng yêu nước khác; giai cấp công nhân giữ vai trò lãnh đạo.',
        ],
        highlights: ['Dân tộc dân chủ nhân dân', 'Giải phóng dân tộc', 'Tiến lên chủ nghĩa xã hội'],
      },
    ],
    keyPoints: [
      { title: 'Tổ chức', body: 'Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam; mỗi nước Đông Dương xây dựng tổ chức phù hợp thực tiễn dân tộc.' },
      { title: 'Tính chất xã hội', body: 'Dân chủ nhân dân, một phần thuộc địa và nửa phong kiến.' },
      { title: 'Nhiệm vụ trước mắt', body: 'Tập trung chống xâm lược, hoàn thành giải phóng dân tộc.' },
      { title: 'Phương hướng', body: 'Cách mạng dân tộc dân chủ nhân dân tiến lên chủ nghĩa xã hội.' },
    ],
  },
  {
    slug: 'dong-xuan-1953-1954',
    number: '02',
    period: '1953–1954',
    title: 'Đông – Xuân 1953–1954',
    summary: 'Xác định đúng hướng, tổ chức chỉ đạo, tạo thế trên chiến trường và huy động sức mạnh hậu phương.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByFEaYdvRd7WMqdqTS8RjQUUsEZ0vTgeqfz4jGzFibwBM_SdXF5EeQIurDHj67I0NbclTVVn7Odf_U2SDxC_P538wKgyvCaN3Gd63UagJEfvyDe_gr7AoMsjcCrY6yYp6iSy1PUc4ercL5knp-RCTSK91W_ygFULQYDimV59zL6wVbmh7nZmWQc2xfZMK4EskZGAGs0IRaX0ROKqN5eD52GRm-5FpMcvKOQILDzViDABG3bmy6oMrP',
    imageAlt: 'Bản đồ các hướng tiến công chiến lược Đông – Xuân 1953–1954',
    documentLabel: 'Bản đồ Đông – Xuân',
    facts: [
      { label: 'Bối cảnh', value: 'Kế hoạch Nava' },
      { label: 'Chủ trương', value: 'Cuối tháng 9-1953' },
      { label: 'Mục tiêu', value: 'Giữ vững thế chủ động' },
      { label: 'Tác động', value: 'Buộc địch phân tán lực lượng' },
    ],
    sections: [
      {
        id: 'tinh-hinh-va-dinh-huong',
        title: 'Tình hình và định hướng',
        paragraphs: [
          'Năm 1953, Pháp triển khai Kế hoạch Nava, tập trung binh lực nhằm tạo ưu thế quân sự và tìm cách chuyển bại thành thắng. Trong quá trình thực hiện, Pháp từng bước xây dựng Điện Biên Phủ thành một tập đoàn cứ điểm mạnh, trở thành trung tâm của kế hoạch.',
          'Trước tình hình đó, từ đầu tháng 9-1953, Bộ Chính trị và Tổng Quân ủy chỉ đạo nghiên cứu, đánh giá toàn diện tình hình chiến trường. Cuối tháng 9-1953, Bộ Chính trị thông qua chủ trương tác chiến chiến lược Đông – Xuân 1953–1954, nhằm tiêu diệt sinh lực địch, bồi dưỡng lực lượng ta, giữ vững thế chủ động và buộc địch phải phân tán lực lượng.',
        ],
        highlights: ['Kế hoạch Nava', 'Cuối tháng 9-1953', 'Giữ vững thế chủ động'],
      },
      {
        id: 'chi-dao-va-trien-khai-the-tran',
        title: 'Chỉ đạo và triển khai thế trận',
        paragraphs: [
          'Trên cơ sở chủ trương chiến lược, Bộ Tổng Tham mưu xây dựng các kế hoạch tác chiến cụ thể cho từng chiến trường và được Bộ Chính trị phê chuẩn. Ta chủ động mở các cuộc tiến công trên nhiều hướng nhằm kéo giãn và phân tán lực lượng Pháp, làm phá vỡ thế tập trung binh lực của địch.',
          'Các hướng tiến công quan trọng gồm Lai Châu, Trung Lào, Hạ Lào – Đông Bắc Campuchia, Tây Nguyên và Thượng Lào. Đồng thời, hoạt động quân sự được đẩy mạnh ở Bình Trị Thiên, Nam Trung Bộ và Nam Bộ.',
          'Việc phối hợp nhiều chiến trường tạo sức ép khiến quân Pháp phải điều động lực lượng đối phó, qua đó tạo điều kiện để ta tập trung lực lượng vào Điện Biên Phủ.',
        ],
        highlights: ['Nhiều hướng chiến lược', 'Phân tán lực lượng Pháp', 'Tạo điều kiện cho Điện Biên Phủ'],
      },
      {
        id: 'hau-phuong',
        title: 'Hậu phương',
        paragraphs: [
          'Để bảo đảm cho cuộc tiến công chiến lược, Đảng chú trọng phát huy sức mạnh hậu phương và huy động nhân lực, vật lực cho tiền tuyến. Bộ Chính trị thành lập Ủy ban chi viện tiền tuyến, đồng thời tổ chức Hội đồng cung cấp mặt trận Trung ương và các địa phương.',
          'Các phong trào giảm tô, giảm tức và cải cách ruộng đất cũng góp phần huy động sức mạnh của nông dân và hậu phương phục vụ kháng chiến.',
        ],
        highlights: ['Ủy ban chi viện tiền tuyến', 'Hội đồng cung cấp mặt trận', 'Nhân lực và vật lực'],
      },
      {
        id: 'ket-qua-va-vai-tro',
        title: 'Kết quả và vai trò',
        paragraphs: [
          'Cuộc tiến công chiến lược Đông – Xuân 1953–1954 làm thay đổi thế bố trí chiến lược của quân Pháp, buộc địch phải phân tán lực lượng để đối phó trên nhiều hướng.',
          'Ta giữ vững thế chủ động và tạo điều kiện thuận lợi để tập trung lực lượng thực hiện trận quyết chiến chiến lược tại Điện Biên Phủ. Chiến dịch Điện Biên Phủ là đỉnh cao của cuộc tiến công chiến lược Đông – Xuân 1953–1954.',
        ],
        highlights: ['Thay đổi thế bố trí của Pháp', 'Giữ vững thế chủ động', 'Điện Biên Phủ là đỉnh cao'],
      },
    ],
    keyPoints: [
      { title: 'Định hướng', body: 'Tiêu diệt sinh lực địch, bồi dưỡng lực lượng ta và giữ vững thế chủ động.' },
      { title: 'Chỉ đạo', body: 'Bộ Chính trị, Tổng Quân ủy và Bộ Tổng Tham mưu tổ chức nghiên cứu, xây dựng và phê chuẩn kế hoạch.' },
      { title: 'Thế trận', body: 'Tiến công nhiều hướng để kéo giãn, phân tán lực lượng Pháp.' },
      { title: 'Hậu phương', body: 'Tổ chức chi viện và huy động sức người, sức của cho tiền tuyến.' },
    ],
  },
  {
    slug: 'dien-bien-phu',
    number: '03',
    period: '1954',
    title: 'Chiến dịch Điện Biên Phủ',
    summary: 'Từ quyết định mở chiến dịch, phối hợp chiến trường và bảo đảm hậu cần đến thắng lợi ngày 7-5-1954.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvlY3Z_yslJdCArgDVG8D17BPl7D2DCSFTUSIM5UUIJ-uTe8ZqMzjVXwmkzP1ghvPBBMoWnvZ3jm6q6jWrQL9fhBgWIul54Zu-s5YtKtjhD144BO2KkJvR6fG8M-DccnQsSL9cBwnQm7fjpzxt9VyvOBLgxt_hhX0707cuEXK6BUWaQtl5CnW05WLH9ludXtOEYot2agoJlXkC6EAU0fWzHVv5wGphHx0dyeizwhVw7NQxzEmr3epY',
    imageAlt: 'Bản đồ lòng chảo và tập đoàn cứ điểm Điện Biên Phủ',
    documentLabel: 'Hồ sơ Điện Biên Phủ',
    facts: [
      { label: 'Quyết định', value: '6-12-1953' },
      { label: 'Mở màn', value: '13-3-1954' },
      { label: 'Thời gian', value: '56 ngày đêm – 3 đợt' },
      { label: 'Kết thúc', value: '17 giờ 30, ngày 7-5-1954' },
    ],
    sections: [
      {
        id: 'tinh-the',
        title: 'Tình thế',
        paragraphs: [
          'Trong quá trình thực hiện Kế hoạch Nava, Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm mạnh, được xem là trung tâm điểm của kế hoạch. Đến đầu năm 1954, đây là tập đoàn cứ điểm mạnh nhất Đông Dương.',
          'Trên cơ sở thế trận được tạo ra từ cuộc tiến công Đông – Xuân, Điện Biên Phủ trở thành nơi ta có điều kiện tập trung lực lượng để thực hiện trận quyết chiến chiến lược.',
        ],
        highlights: ['Tập đoàn cứ điểm mạnh', 'Trận quyết chiến chiến lược'],
      },
      {
        id: 'quyet-dinh-mo-chien-dich',
        title: 'Quyết định mở chiến dịch',
        paragraphs: [
          'Tháng 12-1953, Bộ Tổng Tham mưu hoàn chỉnh các kế hoạch tác chiến. Trên cơ sở báo cáo quyết tâm của Tổng Quân ủy, ngày 6-12-1953, Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ, giao Đại tướng Võ Nguyên Giáp làm Tư lệnh kiêm Bí thư Đảng ủy chiến dịch.',
          'Đây là bước cụ thể hóa quyết tâm chiến lược của Đảng, đưa cuộc tiến công Đông – Xuân đến trận quyết chiến tại Điện Biên Phủ.',
        ],
        highlights: ['6-12-1953', 'Đại tướng Võ Nguyên Giáp', 'Tư lệnh kiêm Bí thư Đảng ủy'],
      },
      {
        id: 'phoi-hop-chien-truong',
        title: 'Phối hợp chiến trường',
        paragraphs: [
          'Để tạo điều kiện cho Điện Biên Phủ, ta tiếp tục tổ chức các hoạt động quân sự trên nhiều hướng nhằm nghi binh, kéo giãn và phân tán lực lượng địch. Các hướng quan trọng gồm Lai Châu, Trung Lào, Hạ Lào – Đông Bắc Campuchia, Tây Nguyên và Thượng Lào.',
          'Điện Biên Phủ không phải một chiến dịch diễn ra tách biệt, mà được đặt trong thế phối hợp chiến lược trên toàn Đông Dương.',
        ],
        highlights: ['Nghi binh', 'Kéo giãn lực lượng', 'Phối hợp toàn Đông Dương'],
      },
      {
        id: 'hau-phuong-va-bao-dam',
        title: 'Hậu phương và bảo đảm chiến dịch',
        paragraphs: [
          'Để bảo đảm cho chiến dịch, Đảng tổ chức huy động mạnh mẽ nguồn lực hậu phương. Ủy ban chi viện tiền tuyến và Hội đồng cung cấp mặt trận Trung ương, địa phương được tổ chức; nhân lực, dân công, lương thực, đạn dược, vũ khí và phương tiện được tăng cường cho mặt trận.',
          'Điều này thể hiện sự kết hợp giữa quyết tâm chiến lược của Đảng với khả năng tổ chức và huy động sức mạnh của toàn dân để bảo đảm cho trận quyết chiến.',
        ],
        highlights: ['Sức mạnh hậu phương', 'Chi viện tiền tuyến', 'Huy động toàn dân'],
      },
      {
        id: 'to-chuc-thuc-hien-va-cach-danh',
        title: 'Tổ chức thực hiện và cách đánh',
        paragraphs: [
          'Ta tập trung lực lượng bao vây quân Pháp tại Điện Biên Phủ. Phương châm tác chiến được xác định là “đánh chắc, tiến chắc”, “đánh chắc thắng”.',
          'Ngày 13-3-1954, quân ta nổ súng mở màn chiến dịch tại phân khu phía Bắc trung tâm Mường Thanh.',
        ],
        highlights: ['Đánh chắc, tiến chắc', 'Đánh chắc thắng', '13-3-1954'],
      },
      {
        id: 'thang-loi',
        title: 'Thắng lợi',
        paragraphs: [
          'Chiến dịch diễn ra trong 56 ngày đêm, qua 3 đợt tiến công lớn. Đến 17 giờ 30 phút ngày 7-5-1954, quân ta đánh chiếm hầm chỉ huy, bắt sống tướng Christian de Castries cùng Bộ chỉ huy tập đoàn cứ điểm.',
          'Toàn bộ lực lượng địch tại Điện Biên Phủ bị tiêu diệt và bắt sống, chiến dịch kết thúc thắng lợi.',
        ],
        highlights: ['56 ngày đêm', '3 đợt tiến công', '17 giờ 30 ngày 7-5-1954'],
      },
      {
        id: 'y-nghia-lich-su-dang',
        title: 'Ý nghĩa dưới góc nhìn Lịch sử Đảng',
        paragraphs: [
          'Thắng lợi Điện Biên Phủ là đỉnh cao của cuộc tiến công chiến lược Đông – Xuân 1953–1954, góp phần đưa cuộc kháng chiến chống thực dân Pháp đến thắng lợi.',
          'Dưới góc nhìn Lịch sử Đảng, thắng lợi thể hiện vai trò lãnh đạo và chỉ đạo của Đảng trong việc xác định đúng chủ trương chiến lược, tổ chức lực lượng, tạo thế trên chiến trường, huy động sức mạnh hậu phương và chỉ đạo thực hiện quyết tâm chiến lược.',
          'Đây cũng là một biểu hiện của kinh nghiệm lãnh đạo kháng chiến: đề ra đường lối phù hợp thực tiễn, không ngừng hoàn thiện phương thức lãnh đạo và tổ chức thực hiện.',
        ],
        highlights: ['Vai trò lãnh đạo của Đảng', 'Tổ chức lực lượng', 'Kinh nghiệm lãnh đạo kháng chiến'],
      },
    ],
    keyPoints: [
      { title: 'Quyết định', body: 'Ngày 6-12-1953, Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ.' },
      { title: 'Tổ chức và bảo đảm', body: 'Phối hợp chiến trường, huy động hậu phương và tập trung nguồn lực cho trận quyết chiến.' },
      { title: 'Phương châm', body: 'Đánh chắc, tiến chắc; đặt yêu cầu chắc thắng lên hàng đầu.' },
      { title: 'Thắng lợi', body: 'Sau 56 ngày đêm và 3 đợt tiến công, chiến dịch kết thúc lúc 17 giờ 30 ngày 7-5-1954.' },
    ],
  },
]
