import styles from './styles.module.css';

export interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  type,
  placeholder,
  name,
  value,
  onChange
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChange(e?.target?.value)}
    />
  );
}
