import PropTypes from 'prop-types';

import ToDoList from '/src/components/Lists.tsx';
import '/src/scss/sidebar.scss';

export default function SideBar({ state, changeList, createList }) {

  let lists = state.lists;

  return <>
    <div id="sidebar">
      <ul>
        {lists.map((x) => <ToDoList 
          changeList={changeList} 
          key={x.idx} 
          list_data={x} 
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

SideBar.propTypes = {
  state: PropTypes.object,
  changeList: PropTypes.func,
  createList: PropTypes.func
}
