import { BaseLayoutWithHeader, Modal, Section } from '@/shared/ui';
import { Header } from '@/widgets/header';
import styles from './History.module.css';
import { Histories } from '@/features/histories';
import type { HistoryAnalitycItem } from '@/shared/api/history-service';
import { useState } from 'react';
import { Highlights } from '@/features/highlights';

export const History: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<HistoryAnalitycItem | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = (
    id: string | number,
    items: HistoryAnalitycItem[] | null,
  ) => {
    if (items?.length) {
      const item = items.find((item) => item.id === String(id));
      if (item) {
        setIsOpen(true);
        setSelectedItem(item);
      }
    }
  };

  const closeModalHandler = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return (
    <BaseLayoutWithHeader className={styles.root} header={<Header />}>
      <Section>
        <Histories onClickHistoryItem={openModalHandler} />
      </Section>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModalHandler();
        }}
      >
        <Highlights isColumn={true} data={selectedItem?.data} />
      </Modal>
    </BaseLayoutWithHeader>
  );
};
