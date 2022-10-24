import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Product } from '../../pages';
import styles from './styles.module.css';

export interface RenderProductsProps {
  filteredProducts: Product[];
  handleRemoveProduct: (index: number) => void;
}

export default function RenderFilteredProducts({
  filteredProducts,
  handleRemoveProduct,
}: RenderProductsProps) {
  return filteredProducts?.length > 0 ? (
    <div className={styles.renderProductsContainer}>
      {filteredProducts?.map((product, index) => (
        <div
          data-testid="filtered-products"
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
            size="25"
            onClick={() => handleRemoveProduct(index)}
          />
        </div>
      ))}
    </div>
  ) : null; // TODO: notFound
}
