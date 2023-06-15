import { Dispatch, SetStateAction, useState } from "react";
import "./TagList.css"

function AddTag({
    inputOnChange,
    inputOnKeyDown,
    value
}: {
    inputOnChange: Function,
    inputOnKeyDown: Function,
    value: string
}) {

    const [ clicked, setClicked ] = useState(false);
    const inputElement = <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => inputOnChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        list="available-tags"
        autoComplete='off'
    />;
    const btn = <button onClick={toggleComponent}>+</button>;

    function toggleComponent() {
        setClicked(!clicked)
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        inputOnKeyDown(e);
        if (e.key === "Enter") {
            toggleComponent();
        }
    }

    let component = (clicked) ? inputElement : btn;
    return component;
}

export default function TagList({
    options,
    setOptions,
    selectedTags,
    setSelectedTags
}: {
    options: string[],
    setOptions: Dispatch<SetStateAction<string[]>>,
    selectedTags: string[],
    setSelectedTags: Dispatch<SetStateAction<string[]>>,
}) {
    const [ value, setValue ] = useState("");

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            if (value.length == 0 || selectedTags.indexOf(value) != -1) return;
            if (options.indexOf(value) == -1) {
                setOptions([...options, value]);
            }
            setSelectedTags([...selectedTags, value]);
            setValue("");
        } else if (value.length == 0 && e.key === "Backspace") {
            setValue(selectedTags[selectedTags.length - 1] || "");
            setSelectedTags(selectedTags.slice(0, -1));
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return (
        <>
        <span id="taglist">
            <span id="tag-list">{selectedTags.map((st, idx) => <span key={idx} className="tag">{st.trim()}</span>)}</span>

            <AddTag
                inputOnChange={handleChange}
                inputOnKeyDown={handleKey}
                value={value}
            />

            <datalist id="available-tags">
                {options.map((t, key) => <option key={key}>{t}</option>)}
            </datalist>
        </span>
        </>
    )
}