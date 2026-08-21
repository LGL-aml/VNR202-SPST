import type { KnowledgeBranch } from './gameTypes'

export const level1KnowledgeBranches: KnowledgeBranch[] = [
  {
    id: 'organization',
    label: 'Tổ chức',
    nodes: [
      { id: 'public-activity', label: 'Đảng ra hoạt động công khai' },
      { id: 'labor-party', label: 'Đảng Lao động Việt Nam' },
      { id: 'indochina-parties', label: 'Mỗi nước Đông Dương xây dựng một đảng riêng' },
    ],
  },
  {
    id: 'society',
    label: 'Tính chất xã hội',
    nodes: [
      { id: 'people-democracy', label: 'Dân chủ nhân dân' },
      { id: 'part-colony', label: 'Một phần thuộc địa' },
      { id: 'semi-feudal', label: 'Nửa phong kiến' },
    ],
  },
  {
    id: 'opponents',
    label: 'Đối tượng',
    nodes: [
      { id: 'invading-imperialism', label: 'Đế quốc xâm lược' },
      { id: 'us-intervention', label: 'Can thiệp Mỹ' },
      { id: 'reactionary-feudalism', label: 'Phong kiến phản động' },
    ],
  },
  {
    id: 'missions',
    label: 'Nhiệm vụ',
    nodes: [
      { id: 'resist-invasion', label: 'Chống xâm lược' },
      { id: 'national-liberation', label: 'Hoàn thành giải phóng dân tộc' },
      { id: 'remove-feudal-remnants', label: 'Xóa bỏ tàn tích phong kiến' },
      { id: 'land-to-tillers', label: 'Thực hiện người cày có ruộng' },
    ],
  },
  {
    id: 'forces',
    label: 'Lực lượng',
    nodes: [
      { id: 'workers', label: 'Công nhân' },
      { id: 'peasants', label: 'Nông dân' },
      { id: 'petty-bourgeoisie', label: 'Tiểu tư sản' },
      { id: 'national-bourgeoisie', label: 'Tư sản dân tộc' },
      { id: 'worker-peasant-intellectual', label: 'Nền tảng công – nông – lao động trí thức' },
    ],
  },
  {
    id: 'direction',
    label: 'Phương hướng',
    nodes: [
      { id: 'people-national-democracy', label: 'Cách mạng dân tộc dân chủ nhân dân' },
      { id: 'toward-socialism', label: 'Tiến lên chủ nghĩa xã hội' },
    ],
  },
]
