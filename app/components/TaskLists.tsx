import { TaskType } from "../interfaces/Task"

export default function TaskList({ 
    tasks
}: {
    tasks: TaskType[]
}) {

  return (
    <>
      <ul>
        {tasks.map( (t: any) => <li key={t.id}>{t.task_name}</li>)}
      </ul>
    </>
  )
}
