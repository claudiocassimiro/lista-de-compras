import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Product } from '../../pages';
import EmptyState from '../EmptyState';
import styles from './styles.module.css';

export interface RenderProductsProps {
  products: Product[];
  handleRemoveProduct: (productName: string) => void;
}

export default function RenderProducts({
  products,
  handleRemoveProduct,
}: RenderProductsProps) {
  return products?.length > 0 ? (
    <div className={styles.renderProductsContainer}>
      <div className={styles.renderProductsContainer}>
        {products?.map((product, index) => (
          <div
            data-testid="products"
            className={styles.renderProductsProductWrapper}
            key={`${product?.productName}-${index + 1}`}
          >
            <div className={styles.renderProductsProductContent}>
              <p className={styles.renderProductsProductName}>
                {product?.productName}
              </p>
              <hr className={styles.divider} />
              <p className={styles.renderProductsProductPrice}>
                {product?.productPrice}
              </p>
            </div>
            <AiOutlineCloseCircle
              data-testid="delete-product"
              size="25"
              onClick={() => handleRemoveProduct(product?.productName)}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <EmptyState />
  );
}
