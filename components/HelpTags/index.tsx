import styles from './styles.module.css';

export interface HelpTagsProps {
  handleSelectTag: (productName: string, index: number) => void;
  productOnList: string[];
}

export default function HelpTags({
  handleSelectTag,
  productOnList,
}: HelpTagsProps) {
  return (
    <div data-testid="help-tags" className={styles.helpTagsContainer}>
      {productOnList.map((product, index) =>
        index <= 8 ? (
          <button
            type="button"
            onClick={() => handleSelectTag(product, index)}
            key={`${product}-${index + 1}`}
            className={styles.helpTagsTagButton}
          >
            <span className={styles.helpTagsProductName}>{product}</span>
          </button>
        ) : null,
      )}
    </div>
  );
}
