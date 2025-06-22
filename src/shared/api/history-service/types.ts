import type { PostAggregateResponse200 } from '../analitycs-service';

export enum HistoryProcessStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type HistoryProcessUnion =
  HistoryProcessStatus[keyof HistoryProcessStatus];

export interface HistoryAnalitycItem {
  id: string | number;
  filename: string;
  date: string;
  status: HistoryProcessUnion;
  data: PostAggregateResponse200 | null;
}
