import { TaskType } from "@/app/interfaces/Task";
import "./TaskCard.css";

export default function TaskCard({
    task
}: {
    task: TaskType
}) {

    const tags = ["tag1", "tag2", "tag3", "tag4"];
    const spanTags = tags.map( t => <span className="tag">{t}</span>)
    return (
        <div className="task-card">
            <h3>{task.task_name}</h3>
            <div className="task-summary">2/3</div>
            <div className="tag-list">{spanTags}</div>
            <div className="task-date">
                <span>{new Date(task.created_at!).toDateString()}</span>
                <span>{"- Present"}</span>
            </div>
        </div>
    )

}