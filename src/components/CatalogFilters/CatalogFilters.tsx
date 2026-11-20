import type { SortOrder } from '../../types/product';
import { ALL_CATEGORIES, type Filters } from '../../utils/filterProducts';
import { formatCategory } from '../../utils/format';
import Button from '../Button/Button';
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
        aria-label="Категория"
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
        aria-label="Сортировка"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Button variant="secondary" onClick={onReset}>
        Сбросить
      </Button>
    </div>
  );
}

export default CatalogFilters;
