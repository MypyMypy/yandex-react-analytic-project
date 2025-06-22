import classNames from 'classnames';
import { ButtonUploadStatus } from '../model';
import styles from './ButtonUploadEntity.module.css';
import { IconCancel } from '@/shared/ui';
import type { ReactNode } from 'react';
import { IconSpinner } from '@/shared/ui/Icons/IconSpinner';

interface TitleLabel {
  title: ReactNode;
  label: string;
}

const statusMap: Record<
  ButtonUploadStatus,
  (filename?: string | null) => TitleLabel
> = {
  [ButtonUploadStatus.DEFAULT]: () => ({
    title: 'Загрузить файл',
    label: 'или перетащите сюда',
  }),
  [ButtonUploadStatus.FILE_LOADED]: (filename) => ({
    title: filename ?? '-',
    label: 'файл загружен!',
  }),
  [ButtonUploadStatus.PARSING]: () => ({
    title: <IconSpinner />,
    label: 'идёт парсинг файла…',
  }),
  [ButtonUploadStatus.READY]: (filename) => ({
    title: filename ?? '-',
    label: 'готово!',
  }),
  [ButtonUploadStatus.ERROR]: (filename) => ({
    title: filename ?? '-',
    label: 'упс, не то…',
  }),
};

const getButtonUploadEntityTitleAndLabel = (
  status: ButtonUploadStatus,
  filename?: string | null,
): TitleLabel => {
  const fn = statusMap[status];
  return fn(filename);
};

interface ButtonUploadEntityProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  status: ButtonUploadStatus;
  filename?: string | null;
  withRemoveButton?: boolean;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickRemoveButton?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonUploadEntity: React.FC<ButtonUploadEntityProps> = ({
  className,
  status,
  filename,
  withRemoveButton,
  onClickButton,
  onClickRemoveButton,
  ...props
}) => {
  const { title, label } = getButtonUploadEntityTitleAndLabel(status, filename);

  return (
    <div {...props} className={classNames(styles.root, className)}>
      <div
        className={classNames(styles.controls, {
          [styles['with-remove']]: Boolean(withRemoveButton),
        })}
      >
        <button
          className={classNames(styles.button, {
            [styles.loading]: status === ButtonUploadStatus.PARSING,
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
      <span className={styles.label}>{label}</span>
    </div>
  );
};
