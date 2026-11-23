import type { Product } from '../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

function ProductGrid({ products = [], isLoading = false }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {isLoading
        ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
        : products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

export default ProductGrid;
