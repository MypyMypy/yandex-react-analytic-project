import type { ReactNode } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import styles from './LinkRoute.module.css';
import classNames from 'classnames';

interface LinkRouteProps extends Omit<NavLinkProps, 'children'> {
  children?: ReactNode;
  icon?: ReactNode;
}

export const LinkRoute: React.FC<LinkRouteProps> = ({
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <NavLink {...props} className={classNames(styles.root, className)}>
      {({ isActive }) => (
        <div className={classNames(styles.link, { [styles.active]: isActive })}>
          {icon}
          <span>{children}</span>
        </div>
      )}
    </NavLink>
  );
};
