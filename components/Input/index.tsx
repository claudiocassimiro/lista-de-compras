import cn from 'classnames';
import styles from './styles.module.css';

export interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  id?: string;
  onChange: (value: string) => void;
  checked?: boolean;
  className?: string;
}

export default function Input({
  type,
  placeholder,
  name,
  value,
  id,
  onChange,
  checked,
  className,
}: InputProps) {
  return type !== `checkbox` ? (
    <input
      data-testid="inputs-different-than-checkbox"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChange(e?.target?.value)}
      className={cn(styles.input, className)}
    />
  ) : (
    <input
      data-testid="input-checkbox"
      type={type}
      name={name}
      id={id}
      checked={checked}
      onChange={(e) => onChange(e?.target?.value)}
      className={cn(styles.inputCheckBox, className)}
    />
  );
}
