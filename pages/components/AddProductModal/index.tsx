import styles from './styles.module.css';
import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Input from '../Input';
import { useState, useEffect, useMemo } from 'react';
import { Product } from '../..';

export interface AddProductModalProps {
  handleProducts: (product: Product) => void;
}

export default function AddProductModal({
  handleProducts,
}: AddProductModalProps) {
  const modal = useDialogState();
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
    () =>
      thisProductIsSellByWeight
        ? `Preço do Produto por KG`
        : `Preço do Produto`,
    [thisProductIsSellByWeight],
  );

  const modifiedPlaceholdeToQuantity = useMemo(
    () =>
      thisProductIsSellByWeight
        ? `Quantidade do Produto por KG`
        : `Quantidade do Produto`,
    [thisProductIsSellByWeight],
  );

  return (
    <>
      <DialogDisclosure
        className={styles.addProductModalOpenModalButton}
        {...modal}
      >
        <span className={styles.addProductModalButtonText}>
          Adicionar um Produdo
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
            <AiOutlineClose size="28" onClick={modal.hide} />
          </div>

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
              <Input
                className={styles.addProductModalInput}
                name="productPrice"
                value={productPrice}
                type="number"
                placeholder={modifiedPlaceholdeToPrice}
                onChange={setProductPrice}
              />
              <Input
                className={styles.addProductModalInput}
                name="productQuantity"
                value={productQuantity}
                type="number"
                placeholder={modifiedPlaceholdeToQuantity}
                onChange={setProductQuantity}
              />
            </div>
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
