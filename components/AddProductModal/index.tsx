import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
import Input from '../Input';
import styles from './styles.module.css';
import { Product } from '../../pages';
import HelpTags from '../HelpTags';
import productsList from '../../static/productsList';

export interface AddProductModalProps {
  handleProducts: (product: Product) => void;
}

export default function AddProductModal({
  handleProducts,
}: AddProductModalProps) {
  const modal = useDialogState();
  const [productOnList, setProductOnList] = useState(productsList);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>();
  const [productName, setProductName] = useState(``);
  const [thisProductIsSellByWeight, setThisProductIsSellByWeight] =
    useState(false);
  const [productPrice, setProductPrice] = useState(``);
  const [productQuantity, setProductQuantity] = useState(``);

  const allInputIsNotEmpty = useMemo(
    () =>
      productName.length > 0 &&
      productPrice.length > 0 &&
      productQuantity.length > 0,
    [productName, productPrice, productQuantity],
  );

  useEffect(() => {
    if (allInputIsNotEmpty) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [allInputIsNotEmpty]);

  const handleAddProduct = () => {
    if (allInputIsNotEmpty) {
      const product = {
        productName,
        productQuantity,
        productPrice: `${Number(productPrice) * Number(productQuantity)}`,
      };

      handleProducts(product);
    }

    setProductName(``);
    setProductPrice(``);
    setProductQuantity(``);
  };

  const modifiedPlaceholdeToPrice = useMemo(
    () => (thisProductIsSellByWeight ? `Preço por KG` : `Preço`),

    [thisProductIsSellByWeight],
  );

  const modifiedPlaceholdeToQuantity = useMemo(
    () => (thisProductIsSellByWeight ? `Quantidade por KG` : `Quantidade`),
    [thisProductIsSellByWeight],
  );

  const handleSelectTag = (productName: string, index: number) => {
    setProductName(productName);

    const removedProduct = productOnList[index];
    const newProductList = productOnList.filter(
      (_productName, productIndex) => productIndex !== index,
    );

    setProductOnList([...newProductList, removedProduct]);
  };

  return (
    <>
      <DialogDisclosure
        className={styles.addProductModalOpenModalButton}
        {...modal}
      >
        <span className={styles.addProductModalButtonText}>
          Adicionar um Produto
        </span>
        <BsFillPlusCircleFill size="20" />
      </DialogDisclosure>
      {modal.visible && (
        <Dialog
          aria-label="Adicione um Produto"
          {...modal}
          className={styles.addProductModalContainer}
        >
          <div className={styles.addProductModalHeadline}>
            <p className={styles.addProductModalTitle}>Adicione um Produto</p>
            <AiOutlineClose
              data-testid="close-button"
              size="28"
              onClick={modal.hide}
            />
          </div>

          <HelpTags
            handleSelectTag={handleSelectTag}
            productOnList={productOnList}
          />

          <div className={styles.addProductModalContainerContent}>
            <div className={styles.addProductModalContainerInputs}>
              <Input
                className={styles.addProductModalInput}
                type="text"
                name="productName"
                value={productName}
                placeholder="Nome do Produto"
                onChange={setProductName}
              />
              <label htmlFor="radio-kg" className={styles.label}>
                <Input
                  id="radio-kg"
                  type="checkbox"
                  name="productWeight"
                  checked={thisProductIsSellByWeight}
                  onChange={() =>
                    setThisProductIsSellByWeight(!thisProductIsSellByWeight)
                  }
                />
                Esse produto é vendido por KG?
              </label>
              <div
                className={
                  styles.addProductModalContainerInputsPriceAndQuantity
                }
              >
                <Input
                  className={cn(
                    styles.addProductModalInput,
                    styles.addProductModalNumberInputs,
                  )}
                  name="productPrice"
                  value={productPrice}
                  type="number"
                  placeholder={modifiedPlaceholdeToPrice}
                  onChange={setProductPrice}
                />
                <Input
                  className={cn(
                    styles.addProductModalInput,
                    styles.addProductModalNumberInputs,
                  )}
                  name="productQuantity"
                  value={productQuantity}
                  type="number"
                  placeholder={modifiedPlaceholdeToQuantity}
                  onChange={setProductQuantity}
                />
              </div>
            </div>
          </div>
          <div className={styles.addProductModalContainerButton}>
            <button
              type="button"
              className={styles.addProductModalButton}
              disabled={buttonDisabled}
              onClick={handleAddProduct}
            >
              Adicionar
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
