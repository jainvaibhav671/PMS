import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ModalHeader from "./ModalHeader";

import "./Modal.css";

export default function Modal({
  open,
  setOpen,
  children,
  title,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  title: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const { current: dlg } = modalRef;
    if (open) {
      dlg?.showModal();
    } else {
      dlg?.close();
    }
  }, [open]);

  return (
    <>
      <dialog ref={modalRef}>
        <ModalHeader title={title} setOpen={setOpen} />
        <hr />
        {children}
      </dialog>
    </>
  );
}
