import { KeyboardEvent, useState } from "react";
import "./CreateProject.css";
import DropDown from "../../DropDown/DropDown";
import PriorityMenu from "../../DropDown/Menus/PriorityMenu";

export default function CreateProject({
  onSubmit,
  closeDialog,
}: {
  closeDialog: Function;
  onSubmit: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState(<input type="text" value={"Select a Priority"} />);


  function func(formData: FormData) {
    const name = formData.get("proj-name") as string;
    alert(name);
    onSubmit(name);
    closeDialog();
  }

  const handleKey = (e: KeyboardEvent<HTMLFormElement>) => {
    switch (e.key) {
      case "Escape":
        closeDialog();
      case "Enter":
        (() => {})();
      default:
        (() => {})();
    }
  };

  return (
    <form action={func} onKeyDown={(e) => handleKey(e)} id="create-project">
      <div>
        <div className="input-group">
          <label className="form-label" htmlFor="proj-name">
            Project Name
          </label>
          <input
            id="proj-name"
            className="form-input"
            type="text"
            name="proj-name"
            autoFocus
          />
        </div>
        <div className="input-group dropdown">
          <label htmlFor="priority">Priority</label>
          <div onClick={() => setOpen(!open)}>{priority}</div>
          <DropDown open={open} setOpen={setOpen}>
            <PriorityMenu setValue={setPriority} />
          </DropDown>
        </div>
        <div className="input-group">
          <label htmlFor="users">Users</label>
          <input type="text" name="users" />
        </div>
      </div>
      <div>
        <button className="primary-button" type="submit">
          Submit
        </button>
        <button
          onClick={() => closeDialog()}
          type="button"
          className="secondary-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
