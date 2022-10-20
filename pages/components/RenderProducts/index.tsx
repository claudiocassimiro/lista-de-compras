import { Product } from '../..';
import styles from './styles.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export interface RenderProductsProps {
  products: Product[];
  filteredProduct: Product[];
  handleRemoveProduct: (index: number) => void;
}

export default function RenderProducts({
  products,
  filteredProduct,
  handleRemoveProduct,
}: RenderProductsProps) {
  return products?.length > 0 ? (
    <div className={styles.renderProductsContainer}>
      {filteredProduct?.length > 0
        ? filteredProduct?.map((product, index) => {
            return (
              <div
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
            );
          })
        : products?.map((product, index) => {
            return (
              <div
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
            );
          })}
    </div>
  ) : null; // TODO: render empty page
}
