import classNames from 'classnames';
import styles from './Header.module.css';
import { Container } from '@/shared/ui/Layout';
import { LinkRoute } from '@/shared/ui/Components/LinkRoute';
import { RoutesEnum } from '@/app/providers/app-routes';
import Logo from '@/shared/assets/images/Logo SS.png';
import { IconCreate, IconHistory, IconUpload } from '@/shared/ui';

export const Header: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    containerClassName?: string;
  }
> = ({ className, containerClassName, ...props }) => {
  return (
    <header {...props} className={classNames(className, styles.root)}>
      <Container className={classNames(containerClassName, styles.container)}>
        <div className={styles.left}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Межгалактическая аналитика</h1>
        </div>
        <nav className={styles.nav}>
          <LinkRoute icon={<IconUpload />} to={RoutesEnum.CSV_ANALITIC}>
            CSV Аналитик
          </LinkRoute>
          <LinkRoute icon={<IconCreate />} to={RoutesEnum.CSV_GENERATOR}>
            CSV Генератор
          </LinkRoute>
          <LinkRoute icon={<IconHistory />} to={RoutesEnum.CSV_HISTORY}>
            История
          </LinkRoute>
        </nav>
      </Container>
    </header>
  );
};
