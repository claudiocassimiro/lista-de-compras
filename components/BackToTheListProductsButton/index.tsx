import { TbArrowBack } from 'react-icons/tb';
import { Product } from '../../pages';
import styles from './styles.module.css';

export interface BackToTheListProductsButtonProps {
  setFilteredProduct: (product: Product[]) => void;
  setRenderBackToListButton: (value: boolean) => void;
  setRenderSearchNotFound: (value: boolean) => void;
}

export default function BackToTheListProductsButton({
  setFilteredProduct,
  setRenderBackToListButton,
  setRenderSearchNotFound,
}: BackToTheListProductsButtonProps) {
  const handleClick = () => {
    setRenderBackToListButton(false);
    setRenderSearchNotFound(false);
    setFilteredProduct([]);
  };

  return (
    <div className={styles.backToTheListProductsContainer}>
      <button
        data-testid="back-button"
        type="button"
        className={styles.backToTheListProductsBackButton}
        onClick={handleClick}
      >
        <TbArrowBack size="20" />
        <span className={styles.backToTheListProductsText}>Voltar</span>
      </button>
    </div>
  );
}
