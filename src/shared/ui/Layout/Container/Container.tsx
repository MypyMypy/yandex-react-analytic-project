import classNames from 'classnames';
import styles from './Container.module.css';

export const Container: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={classNames(styles.root, className)}>
      {children}
    </div>
  );
};
