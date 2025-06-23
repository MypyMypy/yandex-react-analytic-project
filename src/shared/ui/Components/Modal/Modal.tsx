import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { IconCancel } from '../../Icons';

interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  className,
  overlayClassName,
  isOpen,
  onClose,
  children,
  ...props
}) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(el);

      return () => {
        modalRoot.removeChild(el);
      };
    }
  }, [el, modalRoot]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={classNames(styles.overlay, overlayClassName)}
      onClick={onClose}
    >
      <div
        {...props}
        className={classNames(styles.root, className)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={styles.close} onClick={onClose}>
          <IconCancel />
        </button>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, el);
};
