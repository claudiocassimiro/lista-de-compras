import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Product } from '../../pages';
import { priceFormater } from '../../utils/functions';
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
      {products?.map((product, index) => (
        <div
          data-testid="products"
          className={styles.renderProductsProductWrapper}
          key={`${product?.productName}-${index + 1}`}
        >
          <div className={styles.renderProductsProductContent}>
            <p className={styles.renderProductsProductName}>
              {`${product?.productQuantity} - ${product?.productName}`}
            </p>
            <hr className={styles.divider} />
            <p className={styles.renderProductsProductPrice}>
              {priceFormater(Number(product?.productPrice))}
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
  ) : (
    <EmptyState />
  );
}
