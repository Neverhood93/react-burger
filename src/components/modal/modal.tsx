import React, { useEffect, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface ModalProps {
  title: string;
  onClose: () => void;
}

const modalRoot = document.getElementById("modals")!;

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEsc);

    return () => {
      window.removeEventListener("keydown", closeOnEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div data-test-id="modal_box">
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{title}</p>
          <button
            className={styles.button}
            type="button"
            onClick={onClose}
            data-test-id="close_button"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
