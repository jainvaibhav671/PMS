import PropTypes from 'prop-types';

import ToDoList from './Lists.tsx';
import '../scss/sidebar.scss';

export default function SideBar({ 
  state,
  changeList,
  createList
}: {
  state: typeof PropTypes.object,
  changeList: typeof PropTypes.func,
  createList: typeof PropTypes.func,

}
  ) {

  let lists = state.lists;

  return <>
    <div id="sidebar">
      <ul>
        {lists.map((x: object) => <ToDoList 
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
