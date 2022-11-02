import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import styles from '../styles/Home.module.css';
import AddProductModal from '../components/AddProductModal';
import BackToTheListProductsButton from '../components/BackToTheListProductsButton';
import Header from '../components/Header';
import RenderProducts from '../components/RenderProducts';
import SearchByProduct from '../components/SearchByProduct';
import RenderFilteredProducts from '../components/RenderFilteredProducts';
import Footer from '../components/Footer';
import { priceFormater } from '../utils/functions';
import AboutUs from '../components/AboutUs';
import AboutApp from '../components/AboutApp';

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

    const newProducts = [...products, product];

    setProducts(newProducts);
    localStorage.setItem(`products`, JSON.stringify(newProducts as Product[]));
  };

  const quantityOfProducts = useMemo(() => {
    const totalCount = products.reduce(
      (initialValue, currentValue) =>
        initialValue + Number(currentValue.productQuantity),
      0,
    );

    return totalCount;
  }, [products]);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem(`products`) || `[]`,
    ) as Product[];

    setProducts(savedProducts);
  }, []);

  const totalPrice = useMemo(() => {
    const total = products.reduce(
      (acc, current) => acc + Number(current.productPrice),
      0,
    );

    const formatedTotal = priceFormater(total);

    return formatedTotal;
  }, [products]);

  const handleFilteredProduct = (term: string) => {
    if (term === ``) {
      setRenderBackToListButton(false);
      setRenderSearchNotFound(false);
      return setFilteredProducts([]);
    }

    const serchedProduct = products?.filter(
      (product) =>
        product?.productName
          ?.toLowerCase()?.[0]
          ?.includes(term?.[0]?.toLowerCase()) &&
        product?.productName?.toLowerCase()?.includes(term?.toLowerCase()),
    );

    if (serchedProduct.length === 0) {
      setRenderSearchNotFound(true);
    }

    setRenderBackToListButton(true);
    return setFilteredProducts(serchedProduct);
  };

  const handleRemoveProduct = (productName: string) => {
    const newProducts = products.filter(
      (product) => product.productName !== productName,
    );

    setProducts(newProducts);
    setFilteredProducts([]);
    localStorage.setItem(`products`, JSON.stringify(newProducts as Product[]));
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.emptyContainer]:
          products.length === 0 && filteredProducts.length === 0,
      })}
    >
      <Header />
      <div className={styles.homePageContent}>
        <SearchByProduct
          renderBackToListButton={renderBackToListButton}
          handleFilteredProduct={handleFilteredProduct}
        />
        <AddProductModal handleProducts={handleProducts} />
        <hr className={styles.divider} />
        <div
          className={cn(styles.homePageWrapper, {
            [styles.homePageEmptyWrapper]:
              products.length === 0 && filteredProducts.length === 0,
          })}
        >
          {renderBackToListButton ? (
            <BackToTheListProductsButton
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
              filteredProducts={filteredProducts}
              handleRemoveProduct={handleRemoveProduct}
              setRenderBackToListButton={setRenderBackToListButton}
            />
          )}
        </div>
        {products.length === 0 && filteredProducts.length === 0 ? (
          <div className={styles.homePageContentInfoAboutApp}>
            <AboutApp />
            <AboutUs />
          </div>
        ) : null}
      </div>
      {products.length > 0 &&
      filteredProducts.length === 0 &&
      !renderSearchNotFound ? (
        <Footer
          totalProducts={quantityOfProducts}
          totalPrice={totalPrice}
          setProducts={setProducts}
        />
      ) : null}
    </div>
  );
};

export default Home;
