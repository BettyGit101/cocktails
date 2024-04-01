import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import {ModalProps} from '../assets/types';

const Modal = (props: ModalProps) => {
  const dialogRef = React.createRef<HTMLDialogElement>();

  useEffect(() => {
    const modal = dialogRef.current;
    if (modal && props.isModalOpen) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close()
      }
    };
  }, [props.isModalOpen]);

  return createPortal(
    <dialog ref={dialogRef}
            onClose={props.onCloseModal}
            className={`${styles.modal} ${styles[props.className]}`}
    >
      {props.children}
    </dialog>,
    document.getElementById("modal") as HTMLFormElement
  );
};

export default Modal;
