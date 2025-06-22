import { BaseLayoutWithHeader, Section } from '@/shared/ui';
import { Header } from '@/widgets/header';
import styles from './History.module.css';
import { Histories, getHistoryItems } from '@/features/histories';
import { useEffect, useState } from 'react';
import type { HistoryAnalitycItem } from '@/shared/api/history-service';

export const History: React.FC = () => {
  const [items, setItems] = useState<HistoryAnalitycItem[] | null>(null);

  useEffect(() => {
    const items = getHistoryItems();
    setItems(items ?? null);
    console.log(items);
  }, []);

  return (
    <BaseLayoutWithHeader className={styles.root} header={<Header />}>
      <Section>
        <Histories items={items} />
      </Section>
    </BaseLayoutWithHeader>
  );
};
