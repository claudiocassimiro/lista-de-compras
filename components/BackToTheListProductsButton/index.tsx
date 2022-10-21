import { TbArrowBack } from 'react-icons/tb';
import { Product } from '../../pages';
import styles from './styles.module.css';

export interface BackToTheListProductsButtonProps {
  setFilteredProduct: (product: Product[]) => void;
  setRenderBackToListButton: (value: boolean) => void;
  filteredProduct: Product[] | undefined;
}

export default function BackToTheListProductsButton({
  setFilteredProduct,
  filteredProduct,
  setRenderBackToListButton,
}: BackToTheListProductsButtonProps) {
  const handleClick = () => {
    setRenderBackToListButton(false);
    setFilteredProduct([]);
  };

  return filteredProduct && filteredProduct.length > 0 ? (
    <div className={styles.backToTheListProductsContainer}>
      <button
        type="button"
        className={styles.backToTheListProductsBackButton}
        onClick={handleClick}
      >
        <TbArrowBack size="20" />
        <span className={styles.backToTheListProductsText}>
          Voltar para lista
        </span>
      </button>
    </div>
  ) : null;
}
