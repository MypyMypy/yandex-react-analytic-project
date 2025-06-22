import classNames from 'classnames';
import styles from './Highlights.module.css';
import type { PostAggregateResponse200 } from '@/shared/api/analitycs-service';
import {
  HighlightEntity,
  type HighlightTypeUnion,
} from '@/entities/highlights-entity';

interface HighlightsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: PostAggregateResponse200 | null;
}

function dataItemToHighlight<K extends HighlightTypeUnion>(
  key: K,
  value: PostAggregateResponse200[K],
) {
  return <HighlightEntity key={key} type={key} children={String(value)} />;
}

function dataToHighlights(data: PostAggregateResponse200) {
  return Object.entries(data).map(([key, value]) =>
    dataItemToHighlight(key as HighlightTypeUnion, String(value)),
  );
}

export const Highlights: React.FC<HighlightsProps> = ({
  className,
  data,
  ...props
}) => {
  const isEmpty = data === null;

  return (
    <div
      {...props}
      className={classNames(styles.root, className, {
        [styles.empty]: isEmpty,
      })}
    >
      {isEmpty ? (
        <div className={classNames(styles.placeholder)}>
          <span>Здесь </span>
          <span>появятся хайлайты</span>
        </div>
      ) : (
        <div className={classNames(styles.highlights)}>
          {dataToHighlights(data)}
        </div>
      )}
    </div>
  );
};
