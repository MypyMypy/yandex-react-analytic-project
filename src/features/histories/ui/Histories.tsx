import { HistoryEntity } from '@/entities/history-entity';
import { DeleteHistoryEntity } from '@/entities/delete-history-entity';
import { useHistoryItems } from '../hooks/useHistoryItems';
import styles from './Histories.module.css';
import { ClearHistoryEntity } from '@/entities/clear-history-entity';
import { Link } from 'react-router-dom';
import { RoutesEnum } from '@/app/providers/app-routes';
import type { HistoryAnalitycItem } from '@/shared/api/history-service';
import classNames from 'classnames';

interface HistoriesProps {
  onClickHistoryItem?: (
    id: string | number,
    items: HistoryAnalitycItem[] | null,
  ) => void;
}

export const Histories: React.FC<HistoriesProps> = ({ onClickHistoryItem }) => {
  const { items, removeItem, clearItems } = useHistoryItems();

  if (!items) return null;

  return (
    <div className={styles.root}>
      <div className={styles.items}>
        {items.map((item) => (
          <div
            key={item.id}
            className={classNames(styles.item, {
              [styles['active-item']]: Boolean(item.data),
            })}
          >
            <HistoryEntity
              onClick={() => {
                if (onClickHistoryItem && item.data) {
                  onClickHistoryItem(item.id, items);
                }
              }}
              date={item.date}
              filename={item.filename}
              status={item.status}
            />
            <DeleteHistoryEntity
              onClick={() => {
                removeItem(item.id);
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <Link className={styles.genmore} to={RoutesEnum.CSV_GENERATOR}>
          Сгенерировать больше
        </Link>
        <ClearHistoryEntity
          className={styles.clear}
          onClick={() => {
            clearItems();
          }}
        />
      </div>
    </div>
  );
};
