
import { ACTIONS } from './actions.ts'
import { deleteTask } from './Database.ts'
import ListInterface from './interfaces/List.ts';
import TaskInterface from './interfaces/Task.ts';

interface StateInterface {
  lists: Array<ListInterface>,
  currentList: number,
  tasks: Array<TaskInterface>
}

interface ActionInterface {
  type: String,
  payload: {
    task?: TaskInterface,
    list_name: String,
    data?: {
      id?: number,
      created_at?: Date,
      list_name: String
    },
    task_idx?: number
  }
}

export default function reducer(
  state: StateInterface,
  action: ActionInterface 
) {
  let new_lists = [];
  let idx = undefined;
  let tasks = [];

  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      tasks = [
        ...state.tasks,
        action.payload.task
      ];
      return {
        ...state,
        tasks: tasks
      }

    case ACTIONS.CHANGE_LIST:
      idx =  state.lists.filter((l: ListInterface) => l.list_name == action.payload.list_name)[0].idx

      new_lists = state.lists;
      new_lists[state.currentList].isActive = false;
      new_lists[idx].isActive = true;
      
      return {
        ...state,
        lists: new_lists,
        currentList: idx
      }

    case ACTIONS.CREATE_LIST:
      if (!action.payload.data) {
        return state;
      }
      new_lists = state.lists;
      new_lists.push({
        ...action.payload.data,
        isActive: false,
        idx: new_lists.length,
      });
      
      return {
        ...state,
        lists: new_lists
      }

    case ACTIONS.TOGGLE_TASK:
      if (!action.payload.task_idx) {
        return state;
      }
      idx = action.payload.task_idx;
      tasks = state.tasks;

      console.log(tasks[idx])
      tasks[idx].isCompleted = !tasks[idx].isCompleted;

      return {
        ...state,
        tasks: tasks
      }

    case ACTIONS.DELETE_TASK:
      idx = action.payload.task_idx;
      tasks = state.tasks;
      tasks.splice(idx, 1);

      deleteTask({ task_id: action.payload.task_id });

      return {
        ...state,
        tasks: tasks
      }

    case ACTIONS.UPDATE_LISTS:
      return {
        ...state,
        lists: action.payload.lists
      }
    
    case ACTIONS.UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks
      }

    default: 
      return state;
  }
}