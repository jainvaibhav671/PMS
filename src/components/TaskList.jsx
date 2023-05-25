import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';


import '/src/scss/ItemList.scss';
import { ACTIONS } from '/src/actions.js';

function Task({ task, dispatch }) {
  console.log(task)

  const markTask = () => {
    // console.log(task);
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      payload: {
        task_idx: task.idx
      }
    });
  };

  const deleteTask = () => {
    console.log(task, "Deleting");
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: {
        task_id: task.id,
        idx: task.idx
      }
    });
  };

  const markIcon = (task.isCompleted) ? faXmark : faCheck;
  const taskClass = "list-item" + ((task.isCompleted) ? " completed-task" : "");

  return <>
    <li className={taskClass}>
      <h4>{task.task_name}</h4>
      <div>
        <button onClick={markTask} className="primary-button" type="button">
          <FontAwesomeIcon icon={markIcon} size="lg" style={{color: "#ffffff",}} />
        </button>
        <button onClick={deleteTask} className="danger-button" type="button">
          <FontAwesomeIcon icon={faTrashCan} size="lg" style={{color: "#ffffff",}} />
        </button>
      </div>
    </li>
  </>
}

export default function TaskList({ tasks, dispatch }) {
  const listItems = tasks.map((task, idx) => <Task 
              key={idx} 
              task={task} 
              dispatch={dispatch} />);
  return <ul id="task-list">{listItems}</ul>
}

Task.propTypes = {
  task: PropTypes.object,
  dispatch: PropTypes.function
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  dispatch: PropTypes.function
}