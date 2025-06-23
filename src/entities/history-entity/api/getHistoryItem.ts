import { HistoryService } from '@/shared/api/history-service';

export function getHistoryItem(id: string | number) {
  return HistoryService.getHistoryAnalitycItem(id);
}
