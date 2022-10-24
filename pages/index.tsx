import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import AddProductModal from '../components/AddProductModal';
import BackToTheListProductsButton from '../components/BackToTheListProductsButton';
import Header from '../components/Header';
import RenderProducts from '../components/RenderProducts';
import SearchByProduct from '../components/SearchByProduct';
import RenderFilteredProducts from '../components/RenderFilteredProducts';

export interface Product {
  productName: string;
  productPrice: string;
  thisProductIsSellByWeight?: boolean;
  productQuantity: string;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [renderBackToListButton, setRenderBackToListButton] = useState(false);
  const [renderSearchNotFound, setRenderSearchNotFound] = useState(false);

  const handleProducts = (product: Product) => {
    if (products?.find((p) => p?.productName === product?.productName)) {
      return setProducts(
        products.map((p) =>
          p.productName === product.productName
            ? {
                productName: p.productName,
                productQuantity: `${
                  Number(p.productQuantity) + Number(product.productQuantity)
                }`,
                productPrice: `${
                  Number(p.productPrice) * Number(p.productQuantity)
                }`,
              }
            : {
                productName: p.productName,
                productQuantity: p.productQuantity,
                productPrice: `${
                  Number(p.productPrice) * Number(p.productQuantity)
                }`,
              },
        ),
      );
    }

    setProducts([...products, product]);
  };

  const handleFilteredProduct = (term: string) => {
    if (term === ``) {
      setRenderBackToListButton(false);
      setRenderSearchNotFound(false);
      return setFilteredProducts(products);
    }

    const serchedProduct = products?.filter((product) =>
      product?.productName?.toLowerCase()?.includes(term?.toLowerCase()),
    );

    if (serchedProduct.length === 0) {
      setRenderSearchNotFound(true);
    }

    setRenderBackToListButton(true);
    return setFilteredProducts(serchedProduct);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = products?.filter((_product, i) => i !== index);

    setProducts(newProducts);
    setFilteredProducts(
      newProducts?.filter(
        (product) => product.productName !== newProducts[index]?.productName,
      ),
    );
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.homePageContent}>
        <SearchByProduct
          renderBackToListButton={renderBackToListButton}
          handleFilteredProduct={handleFilteredProduct}
        />
        <AddProductModal handleProducts={handleProducts} />
        <hr className={styles.divider} />
        <div className={styles.homePageWrapper}>
          {renderBackToListButton ? (
            <BackToTheListProductsButton
              filteredProduct={filteredProducts}
              setFilteredProduct={setFilteredProducts}
              setRenderBackToListButton={setRenderBackToListButton}
              setRenderSearchNotFound={setRenderSearchNotFound}
            />
          ) : null}
          {filteredProducts?.length === 0 && !renderSearchNotFound ? (
            <RenderProducts
              products={products}
              handleRemoveProduct={handleRemoveProduct}
            />
          ) : (
            <RenderFilteredProducts
              filteredProduct={filteredProducts}
              handleRemoveProduct={handleRemoveProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
