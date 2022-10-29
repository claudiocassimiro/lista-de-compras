import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProduct } from '../../store/searchProductsSlice';
import Input from '../Input';
import styles from './styles.module.css';

export interface SearchByProductProps {
  handleFilteredProduct: (term: string) => void;
  renderBackToListButton: boolean;
}

export default function SearchByProduct({
  handleFilteredProduct,
  renderBackToListButton,
}: SearchByProductProps) {
  const [searchedProduct, setSearchedProduct] = useState(``);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFilteredProduct(searchedProduct);
    dispatch(getSearchedProduct(searchedProduct));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedProduct]);

  useEffect(() => {
    if (renderBackToListButton === false) {
      setSearchedProduct(``);
    }
  }, [renderBackToListButton]);

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
