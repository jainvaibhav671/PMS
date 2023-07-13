import { ProjectInfoType } from "@/lib/database.types";
import Badge from "@/app/components/Badge/Badge";
import { usePushProject } from "@/lib/atoms";
import Progreess from "@/app/components/Progress/Progress";
import { GetCount } from "@/lib/queries";
import { useState } from "react";
import DropDown from "@/app/components/DropDown/DropDown";
import PriorityMenu from "@/app/components/DropDown/Menus/PriorityMenu";
import { Plus } from "@/app/components/icons/icons";

function ProjectRow({ project }: { project: ProjectInfoType }) {
  
  const pushProject = usePushProject();
  const {data: counts, isLoading} = GetCount(project.id);

  if (!project) return <>Loading...</>;

  const [total,completed] = (isLoading) ? [0,0] : counts!;
  const percentage = (project.isCompleted)
    ? 100 : (total == 0)
      ? 0 : completed / total * 100;

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

// DELETE: if necessary
function CreateProject() {

  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("Low");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [tagButttonClicked, setTagButtonClicked] = useState(false);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (tag.length == 0) break;
        setTags((t) => [...t, tag])
        break;
      case "Backspace":
        if (tag.length != 0) break;
        setTag(tags[tags.length -1])
        setTags(tags.slice(0, -1))
      default:
        break;

    }
  }
  const tagInputOrButton = (tagButttonClicked)
    ? <input onKeyDown={handleKey}
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      onBlur={() => setTagButtonClicked((v) => !v)}
      type="text" />
    : (
        <button onClick={() => setTagButtonClicked((v) => !v)} className="svg-button">
          <Plus />
        </button>
      );

  return <tr id="create-project-row">
    <td><input type="text" placeholder="Project Name" /></td>
    <td onClick={() => setOpen(!open)} className="dropdown">
      {<Badge text={priority} type="priority" />}
      <DropDown open={open} setOpen={setOpen}>
        <PriorityMenu setValue={setPriority} />
      </DropDown>
    </td>
    <td><input type="text" placeholder="DD-MM-YYYY HH:MM"/></td>
    <td id="tag-input">
      {tags.map((t,idx) => <Badge key={idx} type="tag" text={t} />)}
      {tagInputOrButton}
    </td>
    <td></td>
    <td></td>
  </tr>
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
