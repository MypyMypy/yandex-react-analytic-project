import { LocalStorageService } from '../localStorageService';
import type { HistoryAnalitycItem } from './types';

const HistoryStorage = new LocalStorageService('history_');

export const HistoryService = {
  getHistoryAnalitycItems() {
    return HistoryStorage.getItem<HistoryAnalitycItem[]>('items');
  },
  getHistoryAnalitycItem(id: string | number) {
    const items = HistoryStorage.getItem<HistoryAnalitycItem[]>('items');
    if (items?.length) {
      return items.find((item) => item.id === String(id));
    }
    return null;
  },
  addHistoryAnalitycItem(item: HistoryAnalitycItem) {
    const items = HistoryStorage.getItem<HistoryAnalitycItem[]>('items');
    HistoryStorage.setItem('items', [...(items ?? []), item]);
  },
  removeHistoryAnalitycItem(id: string | number) {
    const items = HistoryStorage.getItem<HistoryAnalitycItem[]>('items');
    if (items?.length) {
      const updatedItems = items.filter((item) => item.id !== String(id));
      HistoryStorage.setItem('items', updatedItems);
    }
  },
  clearHistoryAnalitycItems() {
    HistoryStorage.clear();
  },
};
