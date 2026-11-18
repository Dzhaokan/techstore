export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatCategory(category: string): string {
  return category.replace(/-/g, ' ');
}
