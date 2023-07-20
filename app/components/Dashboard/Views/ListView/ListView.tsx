import { CurrentProjectAtom } from "@/lib/atoms";
import { GetAllProjects, GetProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import ProjectList from "./ProjectList";
import "../views.css";

export default function ListView() {

  const current = useAtomValue(CurrentProjectAtom);
  const { data: projects, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  return (
    <>
      {isLoading || !projects ? (
        "Loading..."
      ) : (
        <div className="table-container">
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
            <ProjectList projects={projects!} />
          </table>
        </div>
      )}
    </>
  );
}
