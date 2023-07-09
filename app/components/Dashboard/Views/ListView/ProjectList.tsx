import { Project } from "@/lib/database.types";
import { GetAllProjects, GetProject } from "@/lib/queries";
import Badge from "../../Badge/Badge";
import { useAtomValue, useSetAtom } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";

function ProjectRow({ project }: { project: Project }) {
  if (!project) return <div>Loading...</div>;

  const changeProject = useSetAtom(CurrentProjectAtom);

  const handleClick = () => {
    changeProject(project.id);
  };

  return (
    <tr className="project-row" onClick={handleClick}>
      <td>{project.name}</td>
      <td>
        <Badge text={project.priority as string} type="priority" />
      </td>
      <td>
        {new Date(project.deadline as string).toLocaleString("default", {
          dateStyle: "medium",
        })}
      </td>
    </tr>
  );
}

export default function ProjectList() {
  const current = useAtomValue(CurrentProjectAtom);
  const { data: projects, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  if (isLoading || !projects) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {projects.map((project, idx) => (
        <ProjectRow key={idx} project={project} />
      ))}
    </>
  );
}
