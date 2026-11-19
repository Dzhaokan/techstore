import type { SortOrder } from '../../types/product';
import { ALL_CATEGORIES, type Filters } from '../../utils/filterProducts';
import { formatCategory } from '../../utils/format';
import styles from './CatalogFilters.module.scss';

interface CatalogFiltersProps {
  filters: Filters;
  categories: string[];
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешевые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
  { value: 'rating-desc', label: 'По рейтингу' },
];

function CatalogFilters({ filters, categories, onChange, onReset }: CatalogFiltersProps) {
  return (
    <div className={styles.filters}>
      <input
        type="search"
        className={styles.search}
        placeholder="Поиск по названию"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <select
        className={styles.select}
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      >
        <option value={ALL_CATEGORIES}>Все категории</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategory(category)}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOrder })}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <button type="button" className={styles.reset} onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
}

export default CatalogFilters;
