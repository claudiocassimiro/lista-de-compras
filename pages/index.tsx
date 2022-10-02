import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddProductModal from './components/AddProductModal'
import BackToTheListProductsButton from './components/BackToTheListProductsButton'
import Header from './components/Header'
import RenderProducts from './components/RenderProducts'
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
            productQuantity: `${Number(p.productQuantity) + Number(product.productQuantity)}`,
            productPrice: `${Number(p.productPrice) * Number(p.productQuantity)}`,
          } : {
            productName: p.productName,
            productQuantity: p.productQuantity,
            productPrice: `${Number(p.productPrice) * Number(p.productQuantity)}`,
          }
      }));
    }

    setProducts([...products, product]);
  };

  const handleFilteredProduct = (term: string) => {
    const product = products?.filter((product) => product
      ?.productName?.toLowerCase()?.includes(term?.toLowerCase()));

    return setFilteredProduct(product);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = products?.filter((_product, i) => i !== index);

    setProducts(newProducts);
    setFilteredProduct(newProducts?.filter((product) => product.productName !== newProducts[index]?.productName));
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.homePageContent}>
        <SearchByProduct handleFilteredProduct={handleFilteredProduct} />
        <AddProductModal handleProducts={handleProducts} />
        <hr className={styles.divider}/>
        <div className={styles.homePageWrapper}>
          {filteredProduct &&
            filteredProduct.length > 0 && (
              <BackToTheListProductsButton setFilteredProduct={setFilteredProduct} /> 
            )
          }
          <RenderProducts products={products} filteredProduct={filteredProduct || []} handleRemoveProduct={handleRemoveProduct} />
        </div>
      </div>
    </div>
  )
}

export default Home
