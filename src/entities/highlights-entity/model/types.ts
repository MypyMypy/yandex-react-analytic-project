export enum HighlightTypeEnum {
  TOTAL_SPEND_GALACTIC = 'total_spend_galactic',
  ROWS_AFFECTED = 'rows_affected',
  LESS_SPENT_AT = 'less_spent_at',
  BIG_SPENT_AT = 'big_spent_at',
  LESS_SPENT_VALUE = 'less_spent_value',
  BIG_SPENT_VALUE = 'big_spent_value',
  AVERAGE_SPEND_GALACTIC = 'average_spend_galactic',
  BIG_SPENT_CIV = 'big_spent_civ',
  LESS_SPENT_CIV = 'less_spent_civ',
}

export type HighlightTypeUnion =
  (typeof HighlightTypeEnum)[keyof typeof HighlightTypeEnum];
