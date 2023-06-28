import { KeyboardEvent, useState } from "react";
import "./CreateProject.css";
import TagList from "../../App/TagList/TagList";
import Loading from "../../Loading/Loading";
import { ProjectMutationType } from "../../Dashboard/Dashboard";

export default function CreateProject({
  onSubmit,
  closeDialog,
}: {
  closeDialog: Function;
  onSubmit: (variables: ProjectMutationType) => void;
}) {
  const [name, setName] = useState("");

  function func(tags: string[]) {
    console.log("Submitting");
    onSubmit({
      name: name,
      tags: tags,
    } as ProjectMutationType);

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

  const availableTags: string[] = [];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
        <div className="input-group">
          <span>Tags </span>
          {!availableTags ? (
            <Loading />
          ) : (
            <TagList
              availableTags={availableTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          )}
        </div>
      </div>
      <div>
        <button
          className="primary-button"
          onClick={() => func(selectedTags)}
          type="button"
        >
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
