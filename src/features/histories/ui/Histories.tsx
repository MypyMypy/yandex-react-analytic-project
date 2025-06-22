import { HistoryEntity } from '@/entities/history-entity';
import {
  DeleteHistoryEntity,
  removeHistoryItem,
} from '@/entities/delete-history-entity';
import type { HistoryAnalitycItem } from '@/shared/api/history-service';

export const Histories: React.FC<{ items?: HistoryAnalitycItem[] | null }> = ({
  items,
}) => {
  if (!items) return null;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <HistoryEntity
            date={item.date}
            filename={item.filename}
            status={item.status}
          />
          <DeleteHistoryEntity
            onClick={() => {
              removeHistoryItem(item.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};
