import { useState } from 'react';
import Input from '../Input';
import styles from './styles.module.css';

export interface SearchByProductProps {
  handleFilteredProduct: (term: string) => void;
}

export default function SearchByProduct({
  handleFilteredProduct,
}: SearchByProductProps) {
  const [searchedProduct, setSearchedProduct] = useState(``);

  const handleSearchedProduct = () => {
    if (searchedProduct.length > 0) {
      return handleFilteredProduct(searchedProduct);
    }
  };

  return (
    <div className={styles.searchByProductContainer}>
      <Input
        type="text"
        name="searchedProduct"
        value={searchedProduct}
        placeholder="Pesquise um produto na lista"
        onChange={setSearchedProduct}
      />
      <button
        type="button"
        className={styles.searchByProductButton}
        onClick={handleSearchedProduct}
      >
        Buscar
      </button>
    </div>
  );
}
