import { BaseLayoutWithHeader, Section } from '@/shared/ui/Layout';
import { Header } from '@/widgets/header';
import { LoadFile } from '@/features/load-file';
import styles from './Generator.module.css';

export const Generator: React.FC = () => {
  return (
    <BaseLayoutWithHeader className={styles.root} header={<Header />}>
      <Section containerClassName={styles.container}>
        <p className={styles.title}>
          Сгенерируйте готовый csv-файл нажатием одной кнопки
        </p>
        <LoadFile />
      </Section>
    </BaseLayoutWithHeader>
  );
};
