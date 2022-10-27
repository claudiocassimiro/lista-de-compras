import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog';
import { Product } from '../../pages';
import styles from './styles.module.css';

export interface ClearListButtonProps {
  setProducts: (products: Product[]) => void;
}

export default function ClearListButton({ setProducts }: ClearListButtonProps) {
  const modal = useDialogState();

  const handleClearList = () => {
    setProducts([]);
    localStorage.setItem(`products`, `[]`);
  };

  return (
    <>
      <DialogDisclosure
        data-testid="clearlist-button-open-modal-button"
        className={styles.clearListButtonOpenModalButton}
        {...modal}
      >
        <span className={styles.clearListButtonTextButton}>Limpar lista</span>
      </DialogDisclosure>
      {modal.visible ? (
        <Dialog
          data-testid="pop-up-to-clear-list"
          aria-label="Você deseja limpar a lista?"
          {...modal}
          className={styles.clearListButtonContainerPopUp}
        >
          <div className={styles.clearListButtonPopUp}>
            <p className={styles.clearListButtonText}>
              Você deseja limpar a lista?
            </p>

            <div className={styles.clearListButtonContainerButtons}>
              <button
                data-testid="yes-button"
                className={styles.clearListButton}
                type="button"
                onClick={handleClearList}
              >
                <span className={styles.clearListButtonTextButton}>Sim</span>
              </button>

              <button
                data-testid="no-button"
                className={styles.clearListButton}
                type="button"
                onClick={modal.hide}
              >
                <span className={styles.clearListButtonTextButton}>Não</span>
              </button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  );
}
