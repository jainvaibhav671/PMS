import { SetStateAction, useState } from "react";
import Modal from "../../Modal/Modal";
import { Plus } from "../../icons/Plus";
import { DatePicker } from "../Prompts/DatePicker/DatePicker";
import "./ProjectInfo.css";
import { ProjectInfo, Tag } from "@/lib/database.types";

export default function ProjectInfo({
  data,
}: {
  data: ProjectInfo | undefined;
}) {
  if (!data) return <></>;

  const [open, setOpen] = useState(false);
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
    <button className="primary-button" onClick={() => setOpen(!open)}>
      Set Deadline
    </button>
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
          {tags}{" "}
          <button className="svg-button">
            <Plus />
          </button>
          <Modal open={open} setOpen={setOpen} title={"Set Deadline"}>
            <DatePicker />
          </Modal>
        </div>
      </div>
    </>
  );
}
