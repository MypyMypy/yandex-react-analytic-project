import { useEffect, useState } from 'react';
import type { HistoryAnalitycItem } from '@/shared/api/history-service';
import { removeHistoryItem } from '@/entities/delete-history-entity';
import { getHistoryItems } from '../api/getHistoryItems';
import { clearHistoryAnalitycItems } from '@/entities/clear-history-entity';

export const useHistoryItems = () => {
  const [items, setItems] = useState<HistoryAnalitycItem[] | null>(null);

  const getItem = (id: string | number) => {
    return items?.find((item) => item.id === String(id));
  };

  const removeItem = (id: string | number) => {
    removeHistoryItem(id);
    setItems((prevState) => {
      return prevState?.filter((item) => item.id !== String(id)) ?? null;
    });
  };

  const clearItems = () => {
    clearHistoryAnalitycItems();
    setItems(null);
  };

  useEffect(() => {
    const items = getHistoryItems();
    setItems(items ?? null);
  }, []);

  return { items, getItem, removeItem, clearItems };
};
