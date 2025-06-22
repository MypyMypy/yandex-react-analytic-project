import classNames from 'classnames';
import styles from './SendToAnalitycEntity.module.css';

type SendToAnalitycEntityProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SendToAnalitycEntity: React.FC<SendToAnalitycEntityProps> = ({
  type,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type={type ?? 'button'}
      className={classNames(styles.root, className)}
    >
      <b>Отправить</b>
    </button>
  );
};
