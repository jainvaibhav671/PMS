import PropTypes from 'prop-types';

import ListInterface from '../interfaces/List';

export default function ToDoList({
  list_data,
  changeList
}: {
  list_data: ListInterface,
  changeList: Function
}) {
  console.log("list data", list_data);
  let onClick = (e) => {
    changeList(e.target.textContent);
  }

  let className = list_data.isActive ? 'active' : 'inactive';
  // console.log(className);

  return <>
    <li>
      <button className={className + " secondary-button-full"} onClick={onClick}>{list_data.list_name}</button>
    </li>
  </>
}

ToDoList.propTypes = {
  list_data: PropTypes.object,
  changeList: PropTypes.func
}
