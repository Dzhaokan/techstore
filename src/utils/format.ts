export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// в api категории вида "mobile-accessories"
export function formatCategory(category: string): string {
  return category.replace(/-/g, ' ');
}
