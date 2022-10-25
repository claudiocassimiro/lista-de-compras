import styles from './styles.module.css';

export interface FooterProps {
  totalProducts: number;
  totalPrice: string;
}

export default function Footer({ totalProducts, totalPrice }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerInfos}>
        <p
          className={styles.footerTotalOfProducts}
        >{`Total de produtos: ${totalProducts}`}</p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.containerInfos}>
        <p className={styles.footerTotalPrice}>{`Total: ${totalPrice}`}</p>
      </div>
    </footer>
  );
}
