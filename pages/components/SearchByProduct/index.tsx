import { useState } from 'react';
import Input from '../Input';
import styles from './styles.module.css'

export default function SearchByProduct() {
  const [searchedProduct, setSearchedProduct] = useState(``)

  return (
    <div className={styles.searchByProductContainer}>
      <Input
        type="text"
        name="searchedProduct"
        value={searchedProduct}
        placeholder="Pesquise um produto na lista"
        onChange={setSearchedProduct}
      />
      <button type="button" className={styles.searchByProductButton}>Buscar</button>
    </div>
  );
}
