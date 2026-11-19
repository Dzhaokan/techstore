// 49990 -> "49 990 сом"
export function formatPrice(price: number): string {
  const formatted = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} сом`;
}

// в api категории на английском вида "mobile-accessories"
const CATEGORY_LABELS: Record<string, string> = {
  smartphones: 'Смартфоны',
  laptops: 'Ноутбуки',
  tablets: 'Планшеты',
  'mobile-accessories': 'Аксессуары',
};

export function formatCategory(category: string): string {
  return CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ');
}
