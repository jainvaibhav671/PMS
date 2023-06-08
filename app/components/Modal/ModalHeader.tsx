import { RefObject } from "react"

export default function ModalHeader({
    title,
    modalRef
}: {
    title: string,
    modalRef: RefObject<HTMLDialogElement>
}) {

    function closeDialog() {
        const { current: dlg } = modalRef;
        dlg?.close();
    }

    return (
        <div id="dialog-header">
            <span>{title}</span>
            <button onClick={closeDialog}></button>
        </div>
    )

}