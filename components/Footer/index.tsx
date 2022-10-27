import { Product } from '../../pages';
import ClearListButton from '../ClearListButton';
import styles from './styles.module.css';

export interface FooterProps {
  totalProducts: number;
  totalPrice: string;
  setProducts: (products: Product[]) => void;
}

export default function Footer({
  totalProducts,
  totalPrice,
  setProducts,
}: FooterProps) {
  return (
    <footer data-testid="footer" className={styles.footer}>
      <div className={styles.footerContainerInfos}>
        <p
          data-testid="total-products"
          className={styles.footerTotalOfProducts}
        >{`Total de produtos: ${totalProducts}`}</p>
        <br />
        <p
          data-testid="total-price"
          className={styles.footerTotalPrice}
        >{`Total: ${totalPrice}`}</p>
      </div>
      <ClearListButton setProducts={setProducts} />
    </footer>
  );
}
