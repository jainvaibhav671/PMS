import { useEffect, useRef } from "react";
import ModalHeader from "./ModalHeader";

import "./Modal.css";

export default function Modal({
    open,
    children,
    title
}: {
    open: boolean,
    children: React.ReactNode,
    title: string
}) {

    const modalRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {

        const { current: dlg } = modalRef;
        if (open) {
            dlg?.show();
        } else {
            dlg?.close();
        }

    }, [open])

    return (
        <>
            <dialog ref={modalRef}>
            <ModalHeader title={title} modalRef={modalRef} />
                {title}
                {children}
            </dialog>
        </>
    )
}