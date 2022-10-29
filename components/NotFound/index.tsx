import Image from 'next/image';
import styles from './styles.module.css';

export default function NotFound() {
  return (
    <div data-testid="not-found-component" className={styles.notFoundContainer}>
      <div className={styles.notFoundContainerImage}>
        <Image
          src="/images/sad-face.webp"
          alt="carrinha triste"
          layout="fill"
        />
      </div>
      <p className={styles.notFoundText}>
        Este item ainda não está em sua lista
      </p>
    </div>
  );
}
