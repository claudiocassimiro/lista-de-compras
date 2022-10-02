import { TbArrowBack } from 'react-icons/tb';
import { Product } from '../..';
import styles from './styles.module.css';

export interface BackToTheListProductsButtonProps {
  setFilteredProduct: (product: Product[]) => void;
}

export default function BackToTheListProductsButton({
  setFilteredProduct,
}: BackToTheListProductsButtonProps) {
  return (
    <div className={styles.backToTheListProductsContainer}>
      <button className={styles.backToTheListProductsBackButton} onClick={() => setFilteredProduct([])}>
        <TbArrowBack size="20" />
        <span className={styles.backToTheListProductsText}>Voltar para lista</span>
      </button>
    </div>
  );
}
