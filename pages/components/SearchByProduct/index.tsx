import styles from './styles.module.css'

export default function SearchByProduct() {
  return (
    <div className={styles.searchByProductContainer}>
      <input className={styles.searchByProductInput} type="text" placeholder="Pesquise um produto na lista" />
      <button type="button" className={styles.searchByProductButton}>Buscar</button>
    </div>
  );
}
