
import '/src/scss/ItemList.scss';
import { ACTIONS } from '/src/actions.js';

function Task({ task, idx, dispatch }) {

  const markTask = () => {
    // console.log(task);
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      payload: {
        task_idx: idx
      }
    });
  };

  const deleteTask = () => {
    console.log(task, "Deleting");
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: {
        task_idx: idx
      }
    });
  };

  const markButtonText = "Mark as " + ((task.isComplete) ? "Incomplete" : "Complete");
  const taskClass = "list-item" + ((task.isComplete) ? " completed-task" : "");
  // console.log(task.name, taskClass);

  return <>
    <li className={taskClass}>
      <h4>{task.name}</h4>
      <div>
        <button onClick={markTask} className="primary-button" type="button">{markButtonText}</button>
        <button onClick={deleteTask} className="danger-button" type="button">Delete Task</button>
      </div>
    </li>
  </>
}

export default function TaskList({ tasks, dispatch }) {
  const listItems = tasks.map((task, idx) => <Task key={task.id} idx={idx} task={task} dispatch={dispatch} />);
  return <ul id="task-list">{listItems}</ul>
}
