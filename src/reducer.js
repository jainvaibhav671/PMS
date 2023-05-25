
import { ACTIONS } from '/src/actions.js'

function createTask({ task }) {
  return {
    name: task,
    isComplete: false
  };
}

export default function reducer(state, action) {
    let new_lists = [];
    let idx = undefined;
    let tasks = [];
    let isComplete = undefined;

    switch (action.type) {
      case ACTIONS.ADD_ITEM:
        tasks = [
          ...state.lists[state.currentList].tasks,
          createTask({ task: action.payload.task })
        ];
        new_lists = state.lists;
        new_lists[state.currentList].tasks = tasks;

        return {
          ...state,
          lists: new_lists 
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
        new_lists = state.lists;

        isComplete = new_lists[state.currentList].tasks[idx].isComplete;
        new_lists[state.currentList].tasks[idx].isComplete = !isComplete;

        return {
          ...state,
          lists: new_lists
        }

      case ACTIONS.DELETE_TASK:
        idx = action.payload.idx;
        new_lists = state.lists;
        new_lists[state.currentList].tasks.splice(idx, 1)

        return {
          ...state,
          lists: new_lists
        }

      case ACTIONS.UPDATE_LISTS:
        return {
          ...state,
          lists: action.payload.lists
        }

      default: 
        return state;
    }
  }