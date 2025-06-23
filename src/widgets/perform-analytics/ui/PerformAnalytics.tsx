import React, { useEffect, useState } from 'react';
import { ButtonUpload } from '@/features/upload-file/ui/ButtonUpload';
import styles from './PerformAnalytics.module.css';
import { SendToAnalityc } from '@/features/send-to-analityc/ui/SendToAnalityc';
import { ButtonUploadStatus } from '@/entities/upload-file-entity';
import classNames from 'classnames';
import { addHistoryItem } from '@/entities/history-entity';
import type { PostAggregateResponse200 } from '@/shared/api/analitycs-service';

const selectCsvFileHandler = (onSelect: (file: File) => void) => {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.csv';
  inp.onchange = () => {
    if (inp.files?.[0]) {
      onSelect(inp.files[0]);
    }
  };
  inp.click();
};

interface PerformAnalyticsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  status: ButtonUploadStatus;
  setStatus: (status: ButtonUploadStatus) => void;
  data?: PostAggregateResponse200 | null;
  onSendAnalytic?: (file: File) => void;
  onResetAnalytic?: () => void;
}

export const PerformAnalytics: React.FC<PerformAnalyticsProps> = ({
  status,
  data,
  setStatus,
  className,
  onSendAnalytic,
  onResetAnalytic,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);

  const [dragActive, setDragActive] = useState(false);

  function handleFileSelect(f: File) {
    if (status !== ButtonUploadStatus.DEFAULT) return;

    const isCsvByName = f.name.toLowerCase().endsWith('.csv');
    const isCsvByType = f.type === 'text/csv';
    if (!isCsvByName && !isCsvByType) {
      setFile(null);
      setStatus(ButtonUploadStatus.ERROR);
      return;
    }

    setFile(f);
    setStatus(ButtonUploadStatus.FILE_LOADED);
  }

  const handleButtonUploadClick = () => {
    if (status !== ButtonUploadStatus.DEFAULT) return;
    selectCsvFileHandler(handleFileSelect);
  };

  const handleButtonUploadRemoveClick = () => {
    setFile(null);
    if (onResetAnalytic) {
      onResetAnalytic();
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const onSendAnalyticHandler = () => {
    if (file && onSendAnalytic) onSendAnalytic(file);
  };

  useEffect(() => {
    if (status === ButtonUploadStatus.ERROR) {
      addHistoryItem({
        data: null,
        filename: file?.name ?? '',
        status: 'failed',
      });
    }
    if (status === ButtonUploadStatus.READY && data) {
      addHistoryItem({
        data: data,
        filename: file?.name ?? '',
        status: 'success',
      });
    }
  }, [status, file, data]);

  return (
    <div {...props} className={classNames(styles.root, className)}>
      {/* TODO Вынести в shared отдельный компонент */}
      <div
        className={classNames(styles.unload, { [styles.drag]: dragActive })}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <ButtonUpload
          onClick={handleButtonUploadClick}
          onRemove={handleButtonUploadRemoveClick}
          status={status}
          filename={file?.name}
        />
      </div>

      <SendToAnalityc status={status} onClick={onSendAnalyticHandler} />
    </div>
  );
};
