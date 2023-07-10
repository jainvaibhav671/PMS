import { Project } from "@/lib/database.types";
import { GetAllProjects, GetProject } from "@/lib/queries";
import Badge from "../../Badge/Badge";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom, usePushProject } from "@/lib/atoms";

function ProjectRow({ project }: { project: Project }) {
  if (!project) return <>Loading...</>;

  const pushProject = usePushProject();

  return (
    <tr
      className="project-row"
      onClick={() => pushProject({ name: project.name, id: project.id })}
    >
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
    return <>Loading...</>;
  }

  return (
    <>
      {projects.map((project, idx) => (
        <ProjectRow key={idx} project={project} />
      ))}
    </>
  );
}
