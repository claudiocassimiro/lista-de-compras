import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddProductModal from './components/AddProductModal'
import Header from './components/Header'
import SearchByProduct from './components/SearchByProduct'

export interface Product {
  productName: string;
  productPrice: string;
  productQuantity: string;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>();

  const handleProducts = (product: Product) => {
    if (products?.find((p) => p?.productName === product?.productName)) {
      return setProducts(products.map((p) => {
        return p.productName === product.productName
          ? {
            productName: p.productName,
            productPrice: p.productPrice,
            productQuantity: `${Number(p.productQuantity) + Number(product.productQuantity)}`
          } : {
            productName: p.productName,
            productPrice: p.productPrice,
            productQuantity: p.productQuantity
          }
      }));
    }

    setProducts([...products, product]);
  };

  const handleFilteredProduct = (term: string) => {
    const product = products?.filter((product) => product?.productName?.includes(term));

    return setFilteredProduct(product);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.homePageContent}>
        <SearchByProduct handleFilteredProduct={handleFilteredProduct} />
        <AddProductModal handleProducts={handleProducts} />
        <hr className={styles.divider}/>
      </div>
    </div>
  )
}

export default Home
