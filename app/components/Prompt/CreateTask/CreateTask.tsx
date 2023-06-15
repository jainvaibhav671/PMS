import { useState } from "react";
import TagList from "../../App/TagList/TagList";
import "./CreateTask.css";

export default function CreateTask(){
    const [ options, setOptions ] = useState<string[]>([]);
    const [ selectedTags, setSelectedTags ] = useState<string[]>([])
    return (
        <form id="create-task-form">
            <label htmlFor="task-name">Task Name</label>
            <input type="text" name="task-name" />

            <div>
                <span>Tags: </span>
                <TagList
                    options={options}
                    setOptions={setOptions}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </div>
        </form>
    )
}