import { apiService } from '@/shared/api/apiService';
import { buildQuery } from '@/shared/lib/buildQuerys';
import type { PostAggregateResponse200 } from './types';

export const analyticsService = {
  getReport: ({
    size = 0.5,
    withErrors,
    maxSpend,
  }: {
    size: number;
    withErrors?: 'off' | 'on';
    maxSpend?: `${number}`;
  }) => {
    const queryString = buildQuery({ size, withErrors, maxSpend });
    const url = '/report' + (queryString ? `?${queryString}` : '');

    return apiService.get<File>(url);
  },
  postAggregate: async (
    params: { rows: number },
    file: File,
    onChunk: (item: PostAggregateResponse200) => void,
  ): Promise<void> => {
    const qs = buildQuery(params);
    const url = '/aggregate' + (qs ? `?${qs}` : '');

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await apiService.rawRequest(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Ошибка ${String(response.status)}: ${response.statusText}`,
      );
    }

    const body = response.body;
    if (body === null) {
      throw new Error('У ответа отсутствует тело потока');
    }

    const reader = body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    let isDone = false;

    while (!isDone) {
      const { done, value } = await reader.read();

      isDone = done;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n');
      const leftover = parts.pop() ?? '';
      const lines = parts;
      buffer = leftover;

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          onChunk(JSON.parse(line) as PostAggregateResponse200);
        } catch {}
      }
    }

    if (buffer.trim()) {
      onChunk(JSON.parse(buffer) as PostAggregateResponse200);
    }
  },
};
