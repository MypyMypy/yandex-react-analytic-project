import { BaseLayoutWithHeader, Section } from '@/shared/ui/Layout';
import { Header } from '@/widgets/header';
import styles from './Generator.module.css';

export const Generator: React.FC = () => {
  return (
    <BaseLayoutWithHeader className={styles.root} header={<Header />}>
      <Section>hello world Generator</Section>
    </BaseLayoutWithHeader>
  );
};
