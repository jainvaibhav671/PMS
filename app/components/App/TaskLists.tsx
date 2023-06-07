import { TaskType } from "@/app/interfaces/Task";
import './task.css'

function Task({
  task
}: {
  task: TaskType
}) {

  function toggleTask() {
    task.isCompleted = !task.isCompleted;
  }

  return (
    <>
      <li key={task.id} className="task">
        <input onChange={toggleTask} type="checkbox" />
        <h4>{task.task_name}</h4>
      </li>
    </>
  );

}

export default function TaskList({ 
    tasks
}: {
    tasks: TaskType[]
}) {

  return (
    <>
      <ul>
        {tasks.map( (t) => <Task task={t} /> )}
      </ul>
    </>
  )
}
