import { useState } from "react";
import Modal from "../../Modal/Modal";
import { Plus } from "../../icons/Plus";
import "./ProjectInfo.css";
import { ProjectInfo } from "@/lib/database.types";
import SingleInput from "../Prompts/SingleInput/SingleInput";
import { CreateTags, UpdateProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";

function AddTagModal() {
  const [open, setOpen] = useState(false);
  const CreateTagMutation = CreateTags();
  const currentProject = useAtomValue(CurrentProjectAtom);

  async function handleSubmit(formData: FormData) {
    const tag_name = formData.get("tag-text") as string;
    console.log("tagNmae", tag_name);
    if (!tag_name) return;
    const data = await CreateTagMutation.mutateAsync({
      tags: [tag_name],
      project: currentProject,
    });
    console.log(data);
    setOpen(!open);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="svg-button">
        <Plus />
      </button>
      <Modal title="Enter tag" open={open} setOpen={setOpen}>
        <SingleInput type="text" name="tag" onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

function SetDeadline() {
  const [open, setOpen] = useState(false);
  const currentProject = useAtomValue(CurrentProjectAtom);
  const updateProjectMutation = UpdateProject(currentProject);

  async function handleSubmit(formData: FormData) {
    const date = (formData.get("deadline-date") as string)
      .split("-")
      .map((x) => parseInt(x));
    const time = (formData.get("deadline-time") as string)
      .split(":")
      .map((x) => parseInt(x));

    const deadline = new Date(date[0], date[1], date[2], time[0], time[1]);

    await updateProjectMutation.mutateAsync({
      proj_id: currentProject,
      data: { deadline: deadline.toISOString() },
    });
    setOpen(!open);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="primary-button">
        Set Deadline
      </button>
      <Modal title="Enter Deadline" open={open} setOpen={setOpen}>
        <SingleInput type="date time" name="deadline" onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default function ProjectInfo({ data }: { data: ProjectInfo }) {
  const [open, setOpen] = useState(false);
  if (!data) return <></>;

  const tags = data?.project_tags.map((pt, idx) => (
    <span key={idx} className="project-tag">
      {pt.Tag.name}
    </span>
  ));

  const date = data.deadline ? (
    new Date(data?.deadline!).toLocaleString("default", {
      dateStyle: "medium",
    })
  ) : (
    <SetDeadline />
  );

  return (
    <>
      <div className="project-info">
        <span>{data?.isSubproject ? "Task Name" : "Project Name"}</span>
        <span>{data?.name}</span>
        <span>Deadline</span>
        <span>{date}</span>
        {/* TODO: make this */}
        {/* <span>Team</span>
        <span>Members List</span> */}
        <span>Tags</span>
        <div className="tags">
          {tags} <AddTagModal />
        </div>
      </div>
    </>
  );
}
