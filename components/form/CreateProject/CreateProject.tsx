import { useState } from "react"
import "./style.css"

interface CreateProjectInterface {
    closeDialog: () => void,
    onSubmit: (name: string) => void
}

export function CreateProject({ closeDialog, onSubmit }: CreateProjectInterface) {

    const [user, setUser] = useState("");
    const [assignedUsers, setAssignedUsers] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [tag, setTag] = useState("");

    return (
        <form id="cp-form">
            <div className="row">
                <div className="input-group">
                    <label htmlFor="proj_name">Project Name</label>
                    <input type="text" name="proj_name" />
                </div>
            </div>
            
            <div className="row">
                <div className="input-group">
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="">
                        <option selected value="null">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="deadline">Set Deadline</label>
                    <input type="text" name="deadline" />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <label htmlFor="users">Assign To</label>
                    <div className="row">
                        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                        <button role="button" onClick={() => setAssignedUsers((u) => [...u, user])} className="primary-button">Assign</button>
                    </div>
                    <span>{assignedUsers.map((u,key) => <span key={key}>{u}</span>)}</span>
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <label htmlFor="tags">Tags</label>
                    <div className="row">
                        <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" />
                        <button role="button" onClick={() => setTags((v) => [...v, tag])} className="primary-button">Add Tag</button>
                    </div>
                    <span>{tags.map((t,key) => <span key={key}>{t}</span>)}</span>
                </div>
            </div>
            <div className="row"></div>
            <div className="flex gap-1">
                <button className="primary-button">Submit</button>
                <button className="secondary-button">Cancel</button>
            </div>

        </form>
    )
}