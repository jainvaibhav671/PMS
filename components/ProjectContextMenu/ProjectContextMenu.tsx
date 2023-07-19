import { ProjectInfoType } from "@/lib/database.types";
import { UpdateProject } from "@/lib/queries";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@radix-ui/react-context-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function ProjectContextMenu({ project }: { project: ProjectInfoType }) {
  const [priority, setPriority] = useState(project.priority);
  const priorities = ["High", "Medium", "Low"];
  const UpdateProjectMutation = UpdateProject(project.id);

  const updateProject = useCallback(
    async <K extends keyof ProjectInfoType>(
      property: K,
      value: ProjectInfoType[K],
    ) => {
      UpdateProjectMutation.mutateAsync({
        [property]: value,
      });
    },
    [UpdateProjectMutation],
  );

  useEffect(() => {
    if (priority !== project.priority) updateProject("priority", priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority]);

  return (
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
          <span>Change Priority</span><ArrowRight />
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
                {priorities.map((p, key) => (
                  <CommandItem
                    className="command-item"
                    key={key}
                    onSelect={(value) => {
                      setPriority(value);
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
  );
}
