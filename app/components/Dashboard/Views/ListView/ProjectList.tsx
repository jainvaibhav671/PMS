import { ProjectInfoType } from "@/lib/database.types";
import Badge from "@/app/components/Badge/Badge";
import { usePushProject } from "@/lib/atoms";
import Progreess from "@/app/components/Progress/Progress";
import { DeleteTag, GetCount } from "@/lib/queries";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import { ProjectContextMenu } from "@/components/ProjectContextMenu/ProjectContextMenu";
import { Trigger } from "@/components/ProjectContextMenu/Trigger";
import { disableDefaultContextMenu } from "@/lib/utils";

function ProjectRow({ project }: { project: ProjectInfoType }) {

  const pushProject = usePushProject();
  const { data: counts, isLoading } = GetCount(project.id);
  const [pos, setPos] = useState({
    x: "0px",
    y: "0px",
  });

  const DeleteTagMutation = DeleteTag(project.id);
  function removeTag(tag_name: string) {
    DeleteTagMutation.mutate({
      proj_id: project.id,
      tag_name: tag_name,
    });
  }

  const [total, completed] = isLoading ? [0, 0] : counts!;
  const percentage = project.isCompleted
    ? 100 : total == 0
    ? 0 : (completed / total) * 100;

  const tags = project.project_tags.map((t, idx) => (
    <Badge
      removerFn={() => removeTag(t.Tag?.name as string)}
      key={idx}
      text={t.Tag?.name as string}
      type="tag"
    />
  ));

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Trigger onLeftClick={() => pushProject({ name: project.name, id: project.id })} XPos={pos.x} YPos={pos.y} />
      </ContextMenuTrigger>
      <tr
        className="project-row"
        onMouseMove={(e) => {
          setPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
        }}
        onContextMenu={disableDefaultContextMenu}
      >
        <td>{project.name}</td>
        <td>
          <Badge text={project.priority} type="priority" />
        </td>
        <td>
          {new Date(project.deadline as string).toLocaleString("default", {
            dateStyle: "medium",
          })}
        </td>
        <td className="taglist">{tags}</td>
        <td></td>
        <td>
          <Progreess percentage={percentage} />
        </td>
      </tr>
      <ProjectContextMenu project={project} />
    </ContextMenu>
  );
}

export default function ProjectList({
  projects,
}: {
  projects: ProjectInfoType[];
}) {
  return (
    <tbody>
      {projects.map((project, idx) => (
        <ProjectRow key={idx} project={project} />
      ))}
    </tbody>
  );
}
