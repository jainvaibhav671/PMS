import { Dispatch, RefObject, SetStateAction } from "react"

export default function ModalHeader({
    title,
    setOpen
}: {
    title: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
}) {

    function closeDialog() {
        setOpen(false);
    }

    return (
        <div id="dialog-header">
            <span>{title}</span>
            <button onClick={closeDialog}></button>
        </div>
    )

}