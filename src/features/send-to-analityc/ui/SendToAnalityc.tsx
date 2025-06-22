import { SendToAnalitycEntity } from '@/entities/send-to-analityc-entity';
import { ButtonUploadStatus } from '@/entities/upload-file-entity';

interface SendToAnalitycProps {
  status?: ButtonUploadStatus;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SendToAnalityc: React.FC<SendToAnalitycProps> = ({
  status,
  onClick,
}) => {
  const isDisabled = status === ButtonUploadStatus.DEFAULT;
  const isVisible =
    status === ButtonUploadStatus.DEFAULT ||
    status === ButtonUploadStatus.FILE_LOADED;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) onClick(e);
  };

  if (!isVisible) return null;

  return <SendToAnalitycEntity disabled={isDisabled} onClick={handleClick} />;
};
