import { IconSmile, IconSmileSad } from '@/shared/ui';
import {
  HistoryProcessStatus,
  type HistoryProcessUnion,
} from '@/shared/api/history-service';
import styles from './HistoryEntity.module.css';
import classNames from 'classnames';

interface HistoryEntityProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  filename: string;
  date: string;
  status: HistoryProcessUnion;
  actions?: React.ReactNode;
}

export const HistoryEntity: React.FC<HistoryEntityProps> = ({
  date,
  filename,
  status,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(styles.root, className, {
        [styles.success]: status === HistoryProcessStatus.SUCCESS,
        [styles.failed]: status === HistoryProcessStatus.FAILED,
      })}
    >
      <span>{filename}</span>
      <span>{date}</span>
      <span className={classNames(styles['success-col'], className)}>
        Обработан успешно <IconSmile />
      </span>
      <span className={classNames(styles['failed-col'], className)}>
        Не удалось обработать <IconSmileSad />
      </span>
    </div>
  );
};
