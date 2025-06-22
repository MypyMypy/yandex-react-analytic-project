import { HistoryService } from '@/shared/api/history-service';

export function removeHistoryItem(id: string | number) {
  HistoryService.removeHistoryAnalitycItem(id);
}
