import { ProjectInfoType } from "@/lib/database.types";
import Badge from "../../Badge/Badge";
import { usePushProject } from "@/lib/atoms";
import Progreess from "@/app/components/Progress/Progress";
import { GetCount } from "@/lib/queries";

function ProjectRow({ project }: { project: ProjectInfoType }) {
  
  const pushProject = usePushProject();
  const {data: counts, isLoading} = GetCount(project.id);

  if (!project) return <>Loading...</>;

  const [total,completed] = (isLoading) ? [0,0] : counts!;
  const percentage = (total == 0) ? 0 : completed / total * 100;

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
      <td></td>
      <td><Progreess percentage={percentage} /></td>
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
