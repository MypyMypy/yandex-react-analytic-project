import classNames from 'classnames';
import styles from './ClearHistoryEntity.module.css';

export const ClearHistoryEntity: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={classNames(styles.root, className)}>
      {children ?? 'Очистить всё'}
    </button>
  );
};
