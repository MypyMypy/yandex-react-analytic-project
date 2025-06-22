import { useEffect, useState } from 'react';

import {
  type PostAggregateResponse200,
  analyticsService,
} from '@/shared/api/analitycs-service';
import { HistoryService } from '@/shared/api/history-service';
import { ButtonUploadStatus } from '@/entities/upload-file-entity';

interface UsePostAggregateResult {
  data: PostAggregateResponse200[];
  error: boolean;
  loading: boolean;
  status: ButtonUploadStatus;
  setStatus: (status: ButtonUploadStatus) => void;
  execute: (file: File, params: { rows: number }) => Promise<void>;
  reset: () => void;
}

export function usePostAggregate(): UsePostAggregateResult {
  const [data, setData] = useState<PostAggregateResponse200[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ButtonUploadStatus>(
    ButtonUploadStatus.DEFAULT,
  );

  const execute = async (file: File, params: { rows: number }) => {
    setError(false);
    setData([]);
    setLoading(true);
    setStatus(ButtonUploadStatus.PARSING);

    try {
      await analyticsService.postAggregate(params, file, (item) => {
        setData((prev) => [...prev, item]);
      });
      setStatus(ButtonUploadStatus.READY);
    } catch (e) {
      console.log(e);
      setError(true);
      setStatus(ButtonUploadStatus.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setError(false);
    setLoading(false);
    setStatus(ButtonUploadStatus.DEFAULT);
  };

  return { data, error, loading, status, setStatus, execute, reset };
}
