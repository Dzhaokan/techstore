// 49990 -> "49 990 сом"
export function formatPrice(price: number): string {
  const formatted = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} сом`;
}

// в api категории вида "mobile-accessories"
export function formatCategory(category: string): string {
  return category.replace(/-/g, ' ');
}
