
import { ACTIONS } from '/src/actions.js'
import { deleteTask } from '/src/Database.js'

export default function reducer(state, action) {
    let new_lists = [];
    let idx = undefined;
    let tasks = [];
    let isCompleted = undefined;

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

        idx =  state.lists.filter(l => l.list_name == action.payload.list_name)[0].idx

        new_lists = state.lists;
        new_lists[state.currentList].isActive = false;
        new_lists[idx].isActive = true;
        
        return {
          ...state,
          lists: new_lists,
          currentList: idx
        }

      case ACTIONS.CREATE_LIST:
        new_lists = state.lists;
        new_lists.push({
          ...action.payload.data,
          isActive: false,
          idx: new_lists.length,
          tasks: []
        });

        console.log(new_lists);
        
        return {
          ...state,
          lists: new_lists
        }

      case ACTIONS.TOGGLE_TASK:
        idx = action.payload.task_idx;
        tasks = state.tasks;

        isCompleted = tasks[idx].isCompleted;
        tasks[idx].isCompleted = !isCompleted;

        return {
          ...state,
          tasks: tasks
        }

      case ACTIONS.DELETE_TASK:
        idx = action.payload.idx;
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