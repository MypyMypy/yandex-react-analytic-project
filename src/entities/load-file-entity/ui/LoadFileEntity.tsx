import { IconSpinner } from '@/shared/ui/Icons/IconSpinner';
import { ButtonLoadStatus } from '../model/ButtonLoadStatus';
import classNames from 'classnames';
import styles from './LoadFileEntity.module.css';
import { IconCancel } from '@/shared/ui';

interface TitleLabel {
  title: React.ReactNode;
  label: string | null;
}

const statusMap: Record<
  ButtonLoadStatus,
  (filename?: string | null) => TitleLabel
> = {
  [ButtonLoadStatus.DEFAULT]: () => ({
    title: 'Начать генерацию',
    label: null,
  }),
  [ButtonLoadStatus.LOADING]: () => ({
    title: <IconSpinner />,
    label: 'идёт процесс генерации',
  }),
  [ButtonLoadStatus.READY]: () => ({
    title: 'Done!',
    label: 'файл сгенерирован!',
  }),
  [ButtonLoadStatus.ERROR]: () => ({
    title: 'Ошибка',
    label: 'упс, не то…',
  }),
};

const getButtonLoadEntityTitleAndLabel = (
  status: ButtonLoadStatus,
  filename?: string | null,
): TitleLabel => {
  const fn = statusMap[status];
  return fn(filename);
};

interface LoadFileEntityProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  status: ButtonLoadStatus;
  withRemoveButton?: boolean;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickRemoveButton?: React.MouseEventHandler<HTMLButtonElement>;
}

export const LoadFileEntity: React.FC<LoadFileEntityProps> = ({
  className,
  status,
  withRemoveButton,
  onClickButton,
  onClickRemoveButton,
  ...props
}) => {
  const { title, label } = getButtonLoadEntityTitleAndLabel(status);

  return (
    <div {...props} className={classNames(styles.root, className)}>
      <div
        className={classNames(styles.controls, {
          [styles['with-remove']]: Boolean(withRemoveButton),
        })}
      >
        <button
          className={classNames(styles.button, {
            [styles.default]: status === ButtonLoadStatus.DEFAULT,
            [styles.loading]: status === ButtonLoadStatus.LOADING,
            [styles.error]: status === ButtonLoadStatus.ERROR,
            [styles.ready]: status === ButtonLoadStatus.READY,
          })}
          onClick={onClickButton}
        >
          {title}
        </button>
        {withRemoveButton && (
          <button
            className={styles['button-remove']}
            type="button"
            onClick={onClickRemoveButton}
          >
            <IconCancel />
          </button>
        )}
      </div>
      <span
        className={classNames(styles.label, {
          [styles['label-error']]: status === ButtonLoadStatus.ERROR,
        })}
      >
        {label}
      </span>
    </div>
  );
};
