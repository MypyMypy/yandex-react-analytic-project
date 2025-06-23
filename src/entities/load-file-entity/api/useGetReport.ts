import { useState } from 'react';

import { analyticsService } from '@/shared/api/analitycs-service';
import { ButtonLoadStatus } from '../model/ButtonLoadStatus';

interface UsePostAggregateResult {
  data: File | null;
  error: boolean;
  loading: boolean;
  status: ButtonLoadStatus;
  setStatus: (status: ButtonLoadStatus) => void;
  execute: (size?: number) => Promise<void>;
  reset: () => void;
}

export function useGetReport(): UsePostAggregateResult {
  const [data, setData] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ButtonLoadStatus>(
    ButtonLoadStatus.DEFAULT,
  );

  const execute = async (size = 0.1) => {
    setError(false);
    setData(null);
    setLoading(true);
    setStatus(ButtonLoadStatus.LOADING);

    try {
      const response = await analyticsService.getReport({
        size,
      });
      const blob = await response.blob();
      const filename = 'report.csv';
      const file = new File([blob], filename, { type: blob.type });

      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setData(file);
      setStatus(ButtonLoadStatus.READY);
    } catch (e) {
      console.error(e);
      setError(true);
      setStatus(ButtonLoadStatus.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(false);
    setLoading(false);
    setStatus(ButtonLoadStatus.DEFAULT);
  };

  return { data, error, loading, status, setStatus, execute, reset };
}
