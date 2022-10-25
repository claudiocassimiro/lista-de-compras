import styles from './styles.module.css';

export interface FooterProps {
  totalProducts: number;
  totalPrice: string;
}

export default function Footer({ totalProducts, totalPrice }: FooterProps) {
  return (
    <footer data-testid="footer" className={styles.footer}>
      <div className={styles.footerContainerInfos}>
        <p
          data-testid="total-products"
          className={styles.footerTotalOfProducts}
        >{`Total de produtos: ${totalProducts}`}</p>
      </div>
      <hr className={styles.footerDivider} />
      <div className={styles.footerContainerInfos}>
        <p
          data-testid="total-price"
          className={styles.footerTotalPrice}
        >{`Total: ${totalPrice}`}</p>
      </div>
    </footer>
  );
}
