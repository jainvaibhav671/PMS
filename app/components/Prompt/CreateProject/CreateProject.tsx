import { KeyboardEvent, useState } from "react";
import "./CreateProject.css";

export default function CreateProject({
  onSubmit,
  closeDialog,
}: {
  closeDialog: Function;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");

  function func() {
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
    <form onKeyDown={(e) => handleKey(e)} id="create-project">
      <div>
        <div className="input-group">
          <label className="form-label" htmlFor="inp">
            Project Name
          </label>
          <input
            id="inp"
            className="form-input"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            name="inp"
            autoFocus
          />
        </div>
      </div>
      <div>
        <button className="primary-button" onClick={() => func()} type="button">
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
