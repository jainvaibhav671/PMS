import { ProjectInfoType } from "@/lib/database.types";
import Badge from "@/app/components/Badge/Badge";
import { usePushProject } from "@/lib/atoms";
import Progreess from "@/app/components/Progress/Progress";
import { DeleteTag, GetCount, UpdateProject } from "@/lib/queries";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

function ProjectRow({ project }: { project: ProjectInfoType }) {
  const [priority,setPriority] = useState(project.priority)
  const priorities = ["High", "Medium", "Low"]

  const pushProject = usePushProject();
  const { data: counts, isLoading } = GetCount(project.id);
  const [pos, setPos] = useState({
    x: "0px",
    y: "0px",
  });

  const DeleteTagMutation = DeleteTag(project.id);
  const UpdateProjectMutation = UpdateProject(project.id);

  const updateProject = useCallback(<K extends keyof ProjectInfoType>(
    property: K,
    value: ProjectInfoType[K],
  ) => {
    UpdateProjectMutation.mutateAsync({
      [property]: value,
    });
  }, [UpdateProjectMutation])
    
  function removeTag(tag_name: string) {
    DeleteTagMutation.mutate({
      proj_id: project.id,
      tag_name: tag_name,
    });
  }
  const disableDefaultContextMenu = (
    e: React.MouseEvent<Element, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (priority !== project.priority) updateProject("priority", priority)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])

  const [total, completed] = isLoading ? [0, 0] : counts!;
  const percentage = project.isCompleted
    ? 100
    : total == 0
    ? 0
    : (completed / total) * 100;

  const tags = project.project_tags.map((t, idx) => (
    <Badge
      removerFn={() => removeTag(t.Tag?.name as string)}
      key={idx}
      text={t.Tag?.name as string}
      type="tag"
    />
  ));

  const RightClickDivPos: CSSProperties = {
    position: "absolute",
    left: pos.x,
    top: pos.y,
    width: "2px",
    height: "2px",
    cursor: "pointer",
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={() => pushProject({ name: project.name, id: project.id })}
          style={RightClickDivPos}
        ></div>
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
          <Badge text={priority} type="priority" />
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

      <ContextMenuContent className="context-menu">
        {project.isSubproject ? (
          <ContextMenuItem
            onClick={() => updateProject("isCompleted", !project.isCompleted)}
            className="context-menu-item"
          >
            {project.isCompleted ? "Mark not Complete" : "Mark Complete"}
          </ContextMenuItem>
        ) : (
          <></>
        )}
        <ContextMenuItem className="context-menu-item">
          Change Project Name
        </ContextMenuItem>
        <ContextMenuSub>
        <ContextMenuSubTrigger className="context-menu-item">
          Change Priority
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="command-container">
          <Command>
            <CommandInput
              placeholder="Filter label..."
              autoFocus={true}
              className="command-input"
            />
            <CommandList className="command-list">
              <CommandEmpty>No label found.</CommandEmpty>
              <CommandGroup className="command-group">
                {priorities.map((p,key) => (
                  <CommandItem
                    className="command-item"
                    key={key}
                    onSelect={(value) => {
                      setPriority(value)
                    }}
                  >
                    {p}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem className="context-menu-item">
          Change Deadline
        </ContextMenuItem>
        <ContextMenuItem className="context-menu-item">
          Delete Project
        </ContextMenuItem>
      </ContextMenuContent>
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
