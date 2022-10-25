import Image from 'next/image';
import styles from './styles.module.css';

export default function EmptyState() {
  return (
    <div className={styles.emptyStateContainer} data-testid="empty-state">
      <div className={styles.emptyStateContainerImage}>
        <Image
          src="/images/empty-state-image.webp"
          alt="Picture of the author"
          layout="fill"
        />
      </div>
      <p className={styles.emptyStateText}>
        Seu carrinho está vazio, Adicione alguns Produtos!
      </p>
    </div>
  );
}
