import "../views.css";
import ProjectList from "./ProjectList";
export default function ListView() {
  return (
    <table className="list-view">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Tags</th>
          <th>Assignees</th>
          <th>Progress</th>
        </tr>
      </thead>
      <ProjectList />
    </table>
  );
}
