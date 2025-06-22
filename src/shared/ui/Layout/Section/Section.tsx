import classNames from 'classnames';
import { Container } from '../Container';
import styles from './Section.module.css';

export const Section: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    containerClassName?: string;
  }
> = ({ className, containerClassName, children, ...props }) => {
  return (
    <section className={classNames(styles.root, className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};
