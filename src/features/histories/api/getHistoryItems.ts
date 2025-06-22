import { HistoryService } from '@/shared/api/history-service';

export function getHistoryItems() {
  return HistoryService.getHistoryAnalitycItems();
}
