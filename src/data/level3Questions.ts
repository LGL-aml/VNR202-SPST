import type { QuizQuestion } from './gameTypes'

export const level3Questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Ngày nào Bộ Chính trị quyết định mở Chiến dịch Điện Biên Phủ?',
    answers: [
      { id: 'A', label: '6-12-1953' },
      { id: 'B', label: '13-3-1954' },
      { id: 'C', label: '7-5-1954' },
      { id: 'D', label: '21-7-1954' },
    ],
    correctAnswer: 'A',
  },
  {
    id: '2',
    question: 'Ai được giao làm Tư lệnh kiêm Bí thư Đảng ủy Chiến dịch Điện Biên Phủ?',
    answers: [
      { id: 'A', label: 'Trường Chinh' },
      { id: 'B', label: 'Hồ Chí Minh' },
      { id: 'C', label: 'Võ Nguyên Giáp' },
      { id: 'D', label: 'Phạm Văn Đồng' },
    ],
    correctAnswer: 'C',
  },
  {
    id: '3',
    question: 'Phương châm tác chiến được xác định là gì?',
    answers: [
      { id: 'A', label: 'Đánh nhanh, giải quyết nhanh' },
      { id: 'B', label: 'Đánh chắc, tiến chắc' },
      { id: 'C', label: 'Phòng ngự tích cực' },
      { id: 'D', label: 'Rút lui chiến lược' },
    ],
    correctAnswer: 'B',
  },
  {
    id: '4',
    question: 'Chiến dịch Điện Biên Phủ diễn ra trong bao nhiêu ngày đêm?',
    answers: [
      { id: 'A', label: '30' },
      { id: 'B', label: '45' },
      { id: 'C', label: '56' },
      { id: 'D', label: '75' },
    ],
    correctAnswer: 'C',
  },
  {
    id: '5',
    question: 'Sự kiện nào đánh dấu kết thúc thắng lợi Chiến dịch Điện Biên Phủ?',
    answers: [
      { id: 'A', label: 'Quân ta mở màn chiến dịch ngày 13-3-1954' },
      { id: 'B', label: 'Pháp tăng quân lên Điện Biên Phủ' },
      { id: 'C', label: 'Quân ta đánh chiếm hầm chỉ huy lúc 17 giờ 30 phút ngày 7-5-1954' },
      { id: 'D', label: 'Nava triển khai kế hoạch mới' },
    ],
    correctAnswer: 'C',
  },
]
