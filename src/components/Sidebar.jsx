
import ToDoList from '/src/components/Lists.jsx';
import '/src/scss/sidebar.scss';

export default function SideBar({ state, changeList, createList }) {

  let lists = [];
  for (let l in state.data) {
    if (!l || l.length == 0) {
      continue;
    }
    lists.push(l);
    // console.log(l);
  }

  return <>
    <div id="sidebar">
      <ul>
        {lists.map((x,y) => <ToDoList 
          changeList={changeList} 
          key={y} 
          list_data={state.data[x]} 
        />)}
      </ul>
      <button 
        className="primary-button" 
        type="button" 
        onClick={createList}>
        + Create List
      </button>
    </div>
  </>
}
