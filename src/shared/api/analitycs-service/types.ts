export enum CivEnum {
  HUMAN = 'humans',
  BLOBS = 'blobs',
  MONSTERS = 'monsters',
}

export type CivUnion = CivEnum[keyof CivEnum];

export interface PostAggregateResponse200 {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: CivUnion;
  less_spent_civ: CivUnion;
}
