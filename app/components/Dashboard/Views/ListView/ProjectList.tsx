import { ProjectInfoType } from "@/lib/database.types";
import Badge from "@/app/components/Badge/Badge";
import { usePushProject } from "@/lib/atoms";
import Progreess from "@/app/components/Progress/Progress";
import { DeleteTag, GetCount } from "@/lib/queries";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { CSSProperties, useState } from "react";

function ProjectRow({ project }: { project: ProjectInfoType }) {
  const pushProject = usePushProject();
  const {data: counts, isLoading} = GetCount(project.id);
  const [pos, setPos] = useState({
    x: "0px",
    y: "0px"
  })

  const DeleteTagMutation = DeleteTag(project.id)
  function removeTag(tag_name: string) {
    DeleteTagMutation.mutate({
      proj_id: project.id,
      tag_name: tag_name
    })
  }

  if (!project) return <>Loading...</>;

  const [total,completed] = (isLoading) ? [0,0] : counts!;
  const percentage = (project.isCompleted)
    ? 100 : (total == 0)
    ? 0 : completed / total * 100;

  const tags = project.project_tags.map((t, idx) => <Badge removerFn={() => removeTag(t.Tag?.name as string)} key={idx} text={t.Tag?.name as string} type="tag" />)

  const disableDefaultContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
  }

  const RightClickDivPos: CSSProperties = {
    position: "absolute",
    left: pos.x,
    top: pos.y,
    width: "2px",
    height: "2px",
    transition: "left 100ms ease-in-out, top 100ms ease-in-out",
    cursor: "pointer",
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div 
        onClick={() => pushProject({ name: project.name, id: project.id })}
        style={RightClickDivPos}></div>
      </ContextMenuTrigger>
      <tr
        className="project-row"
        onMouseMove={(e) => {
          setPos({ x: `${e.clientX}px`, y: `${e.clientY}px` })
        }}
        onContextMenu={disableDefaultContextMenu}
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

      <ContextMenuContent className="context-menu">
        <ContextMenuItem className="context-menu-item">Profile</ContextMenuItem>
        <ContextMenuItem className="context-menu-item">Billing</ContextMenuItem>
        <ContextMenuItem className="context-menu-item">Team</ContextMenuItem>
        <ContextMenuItem className="context-menu-item">Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
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
