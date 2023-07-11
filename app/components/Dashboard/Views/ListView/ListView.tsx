import { CurrentProjectAtom } from "@/lib/atoms";
import { GetAllProjects, GetProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import ProjectList from "./ProjectList";
import Table from "./Table";
import "../views.css";

export default function ListView() {

  const current = useAtomValue(CurrentProjectAtom);
  const { data: projects, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  if (isLoading || !projects) {
    return <>Loading...</>;
  }

  return <div className="table-container">
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
      <ProjectList projects={projects} />
    </table>
    {/* <Table projects={projects} /> */}
  </div>;
}
