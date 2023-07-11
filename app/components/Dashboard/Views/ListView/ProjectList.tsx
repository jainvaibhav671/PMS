import { ProjectInfoType } from "@/lib/database.types";
import Badge from "../../Badge/Badge";
import { usePushProject } from "@/lib/atoms";

function ProjectRow({ project }: { project: ProjectInfoType }) {
  
  const pushProject = usePushProject();
  if (!project) return <>Loading...</>;

  const tags = project.project_tags.map((t, idx) => <Badge key={idx} text={t.Tag?.name as string} type="tag" />)

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
      <td className="taglist">{tags}</td>
    </tr>
  );
}

export default function ProjectList({projects}: {projects: ProjectInfoType[]}) {
  
  return (
    <tbody>
      {projects.map((project, idx) => (
        <ProjectRow key={idx} project={project} />
      ))}
    </tbody>
  );
}
