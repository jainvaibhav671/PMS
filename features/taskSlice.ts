import { TaskType } from "@/app/interfaces/Task";

type Action = {
  type: string,
  payload: TaskType
}

// TODO: make interfaces
export default function taskReducer(
  tasks: TaskType[],
  action: Action
) {
  switch (action.type) {
    case 'task-added': 
      return [ ...tasks, action.payload ];

    case 'task-toggle':
      return tasks.map(task => {
        if (task.id !== action.payload.id) {
          return task;
        }
        return { ...task, isCompleted: task.isCompleted! }
      })

    default:
      return tasks
  }
}