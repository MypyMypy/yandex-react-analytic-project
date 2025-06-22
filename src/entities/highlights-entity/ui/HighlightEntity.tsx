import classNames from 'classnames';
import styles from './HighlightEntity.module.css';
import { HighlightTypeEnum, type HighlightTypeUnion } from '../model';

const getLabel = (type: HighlightTypeEnum) => {
  switch (type) {
    case HighlightTypeEnum.TOTAL_SPEND_GALACTIC:
      return 'общие расходы в галактических кредитах';
    case HighlightTypeEnum.ROWS_AFFECTED:
      return 'количество обработанных записей';
    case HighlightTypeEnum.LESS_SPENT_AT:
      return 'день года с минимальными расходами';
    case HighlightTypeEnum.BIG_SPENT_CIV:
      return 'цивилизация с максимальными расходами ';
    case HighlightTypeEnum.LESS_SPENT_CIV:
      return 'цивилизация с минимальными расходами';
    case HighlightTypeEnum.BIG_SPENT_AT:
      return 'день года с максимальными расходами';
    case HighlightTypeEnum.BIG_SPENT_VALUE:
      return 'максимальная сумма расходов за день';
    case HighlightTypeEnum.AVERAGE_SPEND_GALACTIC:
      return 'средние расходы в галактических кредитах';
    case HighlightTypeEnum.LESS_SPENT_VALUE:
      return 'минимальная сумма расходов за день';
    default:
      return type;
  }
};

export interface HighlightEntityProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: HighlightTypeUnion;
}

export const HighlightEntity: React.FC<HighlightEntityProps> = ({
  type,
  className,
  children,
  ...props
}) => {
  const label = getLabel(type);

  return (
    <div {...props} className={classNames(styles.root, className)}>
      <strong className={classNames(styles.value)}>{children}</strong>
      <p className={classNames(styles.label)}>{label}</p>
    </div>
  );
};
