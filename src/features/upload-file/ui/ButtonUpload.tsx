import {
  ButtonUploadEntity,
  ButtonUploadStatus,
} from '@/entities/upload-file-entity';
import styles from './ButtonUpload.module.css';

interface ButtonUploadProps {
  status: ButtonUploadStatus;
  onClick?: () => void;
  onRemove?: () => void;
  filename?: string;
}

export const ButtonUpload: React.FC<ButtonUploadProps> = ({
  status,
  filename,
  onClick,
  onRemove,
}) => {
  const showRemoveButton =
    status === ButtonUploadStatus.FILE_LOADED ||
    status === ButtonUploadStatus.READY ||
    status === ButtonUploadStatus.ERROR;

  return (
    <div className={styles.root}>
      <ButtonUploadEntity
        onClickRemoveButton={onRemove}
        onClickButton={onClick}
        status={status}
        filename={filename}
        withRemoveButton={showRemoveButton}
      />
    </div>
  );
};
