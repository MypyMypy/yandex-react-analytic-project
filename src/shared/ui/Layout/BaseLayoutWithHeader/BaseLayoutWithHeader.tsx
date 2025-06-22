import { type ReactNode } from 'react';

import classNames from 'classnames';
import styles from './BaseLayoutWithHeader.module.css';

export const BaseLayoutWithHeader: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    header: ReactNode;
    mainClassName?: string;
  }
> = ({ header, children, className, mainClassName, ...props }) => {
  return (
    <div {...props} className={classNames(styles.root, className)}>
      {header}
      <main className={classNames(styles.main, mainClassName)}>{children}</main>
    </div>
  );
};
