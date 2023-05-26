import { useEffect, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './scss/App.scss'
import { ACTIONS } from '/src/actions.ts'
import reducer from '/src/reducer.ts'

import { getLists, addList, createTask, getTasks } from '/src/Database.ts'
import SideBar from '/src/components/Sidebar.tsx'
import TaskList from '/src/components/TaskList.tsx';

export default function App() {

  const [ state, dispatch ] = useReducer(reducer, {
    lists: [],
    currentList: 0,
    tasks: []
  });

  useEffect(() => {

    async function getTaskLists() {
      let li = await getLists();
      li = li.map((l, idx) => { return { 
          ...l,
          isActive: false,
        idx: idx,
        tasks: []
      }});

      li[0].isActive = true;
      dispatch({
        type: ACTIONS.UPDATE_LISTS,
        payload: {
          lists: li
        }
      });
    }

    getTaskLists();
    
  }, []);

  useEffect(() => {

    async function getTasks_() {
      let tasks = await getTasks({ list_id: state.lists[state.currentList].id });
      tasks = tasks.map( (task, idx) => {
        return {
          ...task,
          idx: idx
        }
      });

      dispatch({
        type: ACTIONS.UPDATE_TASKS,
        payload: {
          tasks: tasks
        }
      });
    }

    if (state.lists.length > 0) {
      getTasks_();
    }

  }, [state.currentList, state.lists]);

  let addTask = async () => {
    let task_name = prompt("What is the task");
    let task = (await createTask({
      task: { 
        task_name: task_name,
        list_id: state.lists[state.currentList].id,
        isCompleted: false
      }
    }));

    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { task: task }
    });
  };

  let createList = async () => {
    let list_name = prompt("Enter List Name");
    let li = (await addList({ list_name: list_name }))[0];
    dispatch({
      type: ACTIONS.CREATE_LIST,
      payload: { data: li }
    })
  }

  function changeList(list_name) {
    dispatch({
      type: ACTIONS.CHANGE_LIST,
      payload: { list_name: list_name }
    })
  }

  let list_name = "";

  // console.log(state);
  
  return <>
    <div id="App">
      <SideBar 
        state={state} 
        changeList={changeList} 
        createList={createList} />

      <div id='items'>
        <div className='head'>
          <p>{list_name}</p>
          <button 
            className="primary-button" 
            onClick={addTask}>
              <FontAwesomeIcon icon={faPlus} size="lg" style={{color: "#ffffff",}} />
            </button>
        </div>
        <TaskList dispatch={dispatch} tasks={state.tasks} />
      </div>
    </div>
  </>
}
