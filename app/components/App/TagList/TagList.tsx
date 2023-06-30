import { Dispatch, SetStateAction, useState } from "react";
import "./TagList.css";

function AddTag({
  inputOnChange,
  inputOnKeyDown,
  value,
}: {
  inputOnChange: Function;
  inputOnKeyDown: Function;
  value: string;
}) {
  const inputElement = (
    <input
      autoFocus
      type="text"
      value={value}
      onChange={(e) => inputOnChange(e)}
      onKeyDown={(e) => inputOnKeyDown(e)}
      list="available-tags"
      autoComplete="off"
    />
  );

  return inputElement;
}

export default function TagList({
  availableTags,
  selectedTags,
  setSelectedTags,
}: {
  availableTags: string[];
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
}) {
  const [options, setOptions] = useState(availableTags);
  const [value, setValue] = useState("");

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (value.length == 0 || selectedTags.indexOf(value) != -1) return;
      if (options.indexOf(value) == -1) {
        setOptions([value, ...options]);
      }
      setSelectedTags([value, ...selectedTags]);
      setValue("");
    } else if (value.length == 0 && e.key === "Backspace") {
      setValue(selectedTags[selectedTags.length - 1] || "");
      setSelectedTags(selectedTags.slice(0, -1));
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const tags = selectedTags.slice(0, 5).map((st, idx) => (
    <span key={idx} className="tag">
      {st.trim()}
    </span>
  ));

  return (
    <>
      <div id="taglist">
        <AddTag
          inputOnChange={handleChange}
          inputOnKeyDown={handleKey}
          value={value}
        />
        <div id="tag-list">
          {tags} {selectedTags.length > 5 ? "..." : ""}
        </div>

        <datalist id="available-tags">
          {options.map((t, key) => (
            <option key={key}>{t}</option>
          ))}
        </datalist>
      </div>
    </>
  );
}
