import { BaseLayoutWithHeader, Section } from '@/shared/ui';
import { Header } from '@/widgets/header';
import styles from './Analytic.module.css';
import { PerformAnalytics } from '@/widgets/perform-analytics';
import { Highlights } from '@/features/highlights';
import { usePostAggregate } from '@/features/highlights/api/useHighlightsRequest';

const ROWS_PER_CHUNK = 2000;

export const Analytic: React.FC = () => {
  const { data, execute, reset, status, setStatus } = usePostAggregate();

  const postAggregateHandler = (file: File) => {
    void (async () => {
      try {
        await execute(file, { rows: ROWS_PER_CHUNK });
      } catch (err) {
        console.error('Analytics failed:', err);
      }
    })();
  };

  return (
    <BaseLayoutWithHeader
      className={styles.root}
      mainClassName={styles.main}
      header={<Header />}
    >
      <Section
        className={styles.section}
        containerClassName={styles['analityc-container']}
      >
        <p className={styles.title}>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём
          за сверхнизкое время
        </p>
        <PerformAnalytics
          status={status}
          setStatus={setStatus}
          onSendAnalytic={postAggregateHandler}
          onResetAnalytic={reset}
          className={styles.analityc}
        />
      </Section>
      <Section
        className={styles.section}
        containerClassName={styles['highlights-container']}
      >
        <Highlights data={data[data.length - 1] ?? null} />
      </Section>
    </BaseLayoutWithHeader>
  );
};
