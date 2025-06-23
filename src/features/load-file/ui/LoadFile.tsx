import { LoadFileEntity, useGetReport } from '@/entities/load-file-entity';
import { ButtonLoadStatus } from '@/entities/load-file-entity/model/ButtonLoadStatus';

export const LoadFile: React.FC = () => {
  const { execute, reset, status } = useGetReport();

  const showRemoveButton =
    status === ButtonLoadStatus.ERROR || status === ButtonLoadStatus.READY;

  return (
    <LoadFileEntity
      onClickButton={() => {
        void execute();
      }}
      withRemoveButton={showRemoveButton}
      onClickRemoveButton={reset}
      status={status}
    />
  );
};
