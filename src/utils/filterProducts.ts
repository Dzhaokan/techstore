import type { Product } from '../types/product';

export interface Filters {
  search: string;
  category: string;
}

export const ALL_CATEGORIES = 'all';

export const initialFilters: Filters = {
  search: '',
  category: ALL_CATEGORIES,
};

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const search = filters.search.trim().toLowerCase();

  return products.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search);
    const matchesCategory = filters.category === ALL_CATEGORIES || p.category === filters.category;
    return matchesSearch && matchesCategory;
  });
}
