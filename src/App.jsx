import { useEffect, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './scss/App.scss'
import { ACTIONS } from '/src/actions.js'
import reducer from '/src/reducer.js'

import { getLists, addList } from '/src/Database.js'
import SideBar from './components/Sidebar.jsx'
import TaskList from '/src/components/TaskList.jsx';

export default function App() {

  const [ state, dispatch ] = useReducer(reducer, {
    lists: [],
    currentList: 0
  });

  useEffect(() => {
    async function getTaskLists() {
      let li = await getLists();
      li = li.map((l, idx) => { return { ...l,
          isActive: false,
          idx: idx,
          tasks: []
        }
      });

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

  let addTask = () => {
    let task = prompt("What is the task");
    if (!task || task.length == 0) {
      return;
    }
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { task: task }
    });
  };

  let createList = async () => {
    let list_name = prompt("Enter List Name");
    let li = (await addList({ list_name: list_name }))[0];
    console.log(li)
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

  let tasks = (state.lists.length == 0 || state.lists[state.currentList].tasks.length == 0) ? [] : state.lists[state.currentList].tasks;
  // let list_name = (lists.length == 0) ? "no lists" : state.lists[state.currentList].list_name;
  let list_name = "";
  
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
        <TaskList dispatch={dispatch} tasks={tasks} />
      </div>
    </div>
  </>
}
