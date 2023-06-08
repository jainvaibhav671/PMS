import { TaskType } from "@/app/interfaces/Task";
import './task.css'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function Task({
  task
}: {
  task: TaskType
}) {

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      console.log("Mutation", task)
      return axios.post("/api/tasks/toggle", {
        task_id: task.id,
        isCompleted: !task.isCompleted
      }, {
        "headers": {
            'Content-Type': 'application/json'
        }
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"]})
  })

  async function toggleTask() {
    mutation.mutate();
  }

  return (
    <>
      <li key={task.id} className="task">
        <input onChange={toggleTask} type="checkbox" checked={task.isCompleted} />
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
        {tasks.map( (t) => <Task key={t.id} task={t} /> )}
      </ul>
    </>
  )
}
