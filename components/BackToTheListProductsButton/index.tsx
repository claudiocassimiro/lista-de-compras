import { TbArrowBack } from 'react-icons/tb'
import { Product } from '../../pages'
import styles from './styles.module.css'

export interface BackToTheListProductsButtonProps {
  setFilteredProduct: (product: Product[]) => void
  filteredProduct: Product[] | undefined
}

export default function BackToTheListProductsButton({
  setFilteredProduct,
  filteredProduct,
}: BackToTheListProductsButtonProps) {
  return filteredProduct && filteredProduct.length > 0 ? (
    <div className={styles.backToTheListProductsContainer}>
      <button
        className={styles.backToTheListProductsBackButton}
        onClick={() => setFilteredProduct([])}
      >
        <TbArrowBack size="20" />
        <span className={styles.backToTheListProductsText}>
          Voltar para lista
        </span>
      </button>
    </div>
  ) : null
}
