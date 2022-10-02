import styles from './styles.module.css';
import cn from 'classnames';

export interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Input({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      className={cn(styles.input, className)}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChange(e?.target?.value)}
    />
  );
}
