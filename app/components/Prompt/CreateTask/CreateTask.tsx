import { Dispatch, SetStateAction, useState } from "react";
import TagList from "../../App/TagList/TagList";
import "./CreateTask.css";

export default function CreateTask({
    controller,
    onSubmit
}: {
    controller: Dispatch<SetStateAction<string>>,
    onSubmit: Function
}){
    const [ options, setOptions ] = useState<string[]>([]);
    const [ selectedTags, setSelectedTags ] = useState<string[]>([])
    return (
        <form method="POST" onSubmit={(e) => onSubmit(e)} id="create-task-form">
            <label htmlFor="taskName">Task Name</label>
            <input type="text" name="taskName" onChange={(e) => controller(e.target.value)} />

            <div>
                <span>Tags: </span>
                <TagList
                    options={options}
                    setOptions={setOptions}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}