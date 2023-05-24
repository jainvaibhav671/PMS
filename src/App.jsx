import { useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './scss/App.scss'
import data from '/src/data.json'
import { ACTIONS } from '/src/actions.js'

import SideBar from './components/Sidebar.jsx'
import TaskList from '/src/components/TaskList.jsx';

function createTask(task_name) {
  return {
    id: Date.now(),
    name: task_name,
    isComplete: false
  }
}

export default function App() {

  function reducer(state, action) {
    let new_data = {};
    let idx = null;

    switch (action.type) {
      case ACTIONS.ADD_ITEM:
        const currList = state.currentList;
        let tasks = [...state.data[currList].tasks, createTask(action.payload.task)];
        new_data = state.data;
        new_data[currList].tasks = tasks;

        return {
          ...state,
          data: new_data
        }

      case ACTIONS.CHANGE_LIST:
        // console.log("Changing to ", action.payload.list_name);

        new_data = state.data;
        new_data[state.currentList].isActive = false;
        new_data[action.payload.list_name].isActive = true;
        
        return {
          ...state,
          currentList: action.payload.list_name
        }

      case ACTIONS.CREATE_LIST:
        new_data = state.data;
        new_data[action.payload.list_name] = {
          name: action.payload.list_name,
          isActive: false,
          tasks: []
        };
        
        return {
          currentList: action.payload.list_name,
          data: new_data
        }

      case ACTIONS.TOGGLE_TASK:
        idx = action.payload.task_idx;
        new_data = state.data;

        let isComplete = new_data[state.currentList].tasks[idx].isComplete;
        new_data[state.currentList].tasks[idx].isComplete = !isComplete;

        return {
          ...state,
          data: new_data
        }

      case ACTIONS.DELETE_TASK:
        idx = action.payload.idx;
        new_data = state.data;
        new_data[state.currentList].tasks.splice(idx, 1)

        return {
          ...state,
          data: new_data
        }

      default: 
        return state;
    }
  }

  const [ state, dispatch ] = useReducer(reducer, {
    data: data,
    currentList: ""
  });

  let addTask = () => {
    let task = prompt("What is the task");
    let tasks = state.data[state.currentList].tasks;

    if (task.length == 0 || tasks.indexOf(task) != -1) {
      return;
    }
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { task: task }
    });
  };

  let createList = () => {
    let list_name = prompt("Enter List Name");
    dispatch({
      type: ACTIONS.CREATE_LIST,
      payload: { list_name: list_name }
    })
  }

  function setCurrentList(list_name) {
    dispatch({
      type: ACTIONS.CHANGE_LIST,
      payload: { list_name: list_name }
    })
  }

  let tasks = state.currentList.length == 0 ? [] : state.data[state.currentList].tasks;
  console.log(import.meta.env.VITE_SUPABASE_URL);

  return <>
    <div id="App">
      <SideBar 
        state={state} 
        changeList={setCurrentList} 
        createList={createList} />

      <div id='items'>
        <div className='head'>
          <p>{state.currentList}</p>
          <button 
            className="primary-button" 
            onClick={addTask}>
              <FontAwesomeIcon icon={faPlus} size="lg" style={{color: "#ffffff",}} />
            </button>
        </div>
        <TaskList dispatch={dispatch} tasks={tasks} />
      </div>
    </div>
  </>
}
