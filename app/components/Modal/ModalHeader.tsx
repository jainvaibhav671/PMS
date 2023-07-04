import { Dispatch, RefObject, SetStateAction } from "react";
import { Cross } from "../icons/icons";

export default function ModalHeader({
  title,
  setOpen,
}: {
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  function closeDialog() {
    setOpen(false);
  }

  return (
    <div id="dialog-header">
      <h3>{title}</h3>
      <button onClick={closeDialog}>
        <Cross />
      </button>
    </div>
  );
}
