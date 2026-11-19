import type { Product, SortOrder } from '../types/product';

export interface Filters {
  search: string;
  category: string;
  sort: SortOrder;
}

export const ALL_CATEGORIES = 'all';

export const initialFilters: Filters = {
  search: '',
  category: ALL_CATEGORIES,
  sort: 'default',
};

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const search = filters.search.trim().toLowerCase();

  const result = products.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search);
    const matchesCategory = filters.category === ALL_CATEGORIES || p.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  return result;
}
