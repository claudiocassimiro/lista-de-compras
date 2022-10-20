import { useEffect, useState } from 'react';
import Input from '../Input';
import styles from './styles.module.css';

export interface SearchByProductProps {
  handleFilteredProduct: (term: string) => void;
}

export default function SearchByProduct({
  handleFilteredProduct,
}: SearchByProductProps) {
  const [searchedProduct, setSearchedProduct] = useState(``);

  useEffect(() => {
    handleFilteredProduct(searchedProduct);
  }, [handleFilteredProduct, searchedProduct]);

  return (
    <div className={styles.searchByProductContainer}>
      <Input
        type="text"
        name="searchedProduct"
        value={searchedProduct}
        placeholder="Pesquise um produto na lista"
        onChange={setSearchedProduct}
      />
    </div>
  );
}
