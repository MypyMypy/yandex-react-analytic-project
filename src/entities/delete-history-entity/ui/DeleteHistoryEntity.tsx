import classNames from 'classnames';
import styles from './DeleteHistoryEntity.module.css';
import { IconTrash } from '@/shared/ui';

export const DeleteHistoryEntity: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={classNames(styles.root, className)}>
      {children ?? <IconTrash />}
    </button>
  );
};
