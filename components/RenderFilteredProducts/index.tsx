import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Product } from '../../pages';
import NotFound from '../NotFound';
import styles from './styles.module.css';

export interface RenderProductsProps {
  filteredProducts: Product[];
  handleRemoveProduct: (productName: string) => void;
  setRenderBackToListButton: (value: boolean) => void;
}

export default function RenderFilteredProducts({
  filteredProducts,
  handleRemoveProduct,
  setRenderBackToListButton,
}: RenderProductsProps) {
  const handleDeleteProduct = (productName: string) => {
    setRenderBackToListButton(false);
    handleRemoveProduct(productName);
  };

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
            data-testid="delete-product"
            size="25"
            onClick={() => handleDeleteProduct(product?.productName)}
          />
        </div>
      ))}
    </div>
  ) : (
    <NotFound />
  );
}
