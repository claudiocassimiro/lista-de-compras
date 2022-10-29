import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchedProduct } from '../../store/searchProductsSlice';
import styles from './styles.module.css';

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(true);
  const term = useSelector(selectSearchedProduct);

  const cancelTimeout = setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  useEffect(
    () => () => {
      clearTimeout(cancelTimeout);
    },
    [cancelTimeout],
  );

  return isLoading ? (
    <div className={styles.notFoundContainerSpinner}>
      <div className={styles.notFoundSpinner}>
        <div className={styles.notFoundSpinnerHead} />
      </div>
    </div>
  ) : (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContainerImage}>
        <Image
          src="/images/sad-face.webp"
          alt="carrinha triste"
          layout="fill"
        />
      </div>
      <p className={styles.notFoundText}>{term} ainda não está na sua lista</p>
    </div>
  );
}
