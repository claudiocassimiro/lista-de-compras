import styles from './styles.module.css';
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
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
  const [productPrice, setProductPrice] = useState(``);
  const [productQuantity, setProductQuantity] = useState(``);

  const allInputIsNotEmpty = useMemo(
    () => (
      productName.length > 0 && 
      productPrice.length > 0 && 
      productQuantity.length > 0
    ),
    [productName, productPrice, productQuantity]
  );
  
  useEffect(() => {
    if (allInputIsNotEmpty) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true)
    }
  }, [allInputIsNotEmpty]);

  const handleAddProduct = () => {
    if (allInputIsNotEmpty) {
      const product = {
        productName,
        productPrice,
        productQuantity,
      };

      handleProducts(product);
    }

    setProductName(``);
    setProductPrice(``);
    setProductQuantity(``);
  };

  return (
    <>
      <DialogDisclosure
        className={styles.addProductModalOpenModalButton}
        {...modal}
      >
        <span className={styles.addProductModalButtonText}>Adicionar um Produdo</span>
        <BsFillPlusCircleFill size="20" />
      </DialogDisclosure>
      {modal.visible && (
        <Dialog aria-label="Adicione um Produto" {...modal} className={styles.addProductModalContainer}>
          <div className={styles.addProductModalHeadline}>
            <p className={styles.addProductModalTitle}>Adicione um Produto</p>
            <AiOutlineClose size="28" onClick={modal.hide} />
          </div>

          <div className={styles.addProductModalContainerContent}>
            <div className={styles.addProductModalContainerInputs}>
                <Input
                  type="text"
                  name="productName"
                  value={productName}
                  placeholder="Nome do Produto"
                  onChange={setProductName}
                />
                <Input
                  name="productPrice"
                  value={productPrice}
                  type="number" 
                  placeholder="Preço do Produto"
                  onChange={setProductPrice}
                />
                <Input
                  name="productQuantity"
                  value={productQuantity}
                  type="number" 
                  placeholder="Quantidade do Produto"
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
