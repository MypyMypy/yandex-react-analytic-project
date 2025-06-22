import {
  HistoryService,
  type HistoryAnalitycItem,
} from '@/shared/api/history-service';
import { getCurrentDateFormatted } from '@/shared/utils/date/getCurrentDateFormatted';

export function addHistoryItem({
  data,
  filename,
  status,
}: Omit<HistoryAnalitycItem, 'date' | 'id'>) {
  const date = getCurrentDateFormatted();
  const now = String(Date.now());

  HistoryService.addHistoryAnalitycItem({
    data,
    date,
    filename,
    id: now,
    status,
  });
}
