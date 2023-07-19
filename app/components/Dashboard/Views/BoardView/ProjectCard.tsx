"use client";
import { ProjectInfoType } from "@/lib/database.types";
import { useState } from "react";
import Modal from "../../../Modal/Modal";
import CardOptions from "./CardOptions/CardOptions";
import { CogSixTooth } from "../../../icons/icons";
import { usePushProject } from "@/lib/atoms";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Trigger } from "@/components/ProjectContextMenu/Trigger";
import { disableDefaultContextMenu } from "@/lib/utils";
import { ProjectContextMenu } from "@/components/ProjectContextMenu/ProjectContextMenu";

export function Tag({ tag_name }: { tag_name: string }) {
  return <span className="project-tag">{tag_name}</span>;
}

export function ProjectCard({ data }: { data: ProjectInfoType }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: "0px", y: "0px" });
  
  const deadline = data.deadline
    ? `${new Date(data.deadline).toLocaleString("default", {
        dateStyle: "medium",
      })}`
    : "No due date";


  const tags = data.project_tags.map((t, idx) => <Tag key={idx} tag_name={t.Tag?.name as string} />);
  const pushProject = usePushProject();

  return (
    <ContextMenu>
    <div onMouseMove={(e) => {
          console.log("screen", e.screenX, e.screenY)
          console.log("page", e.pageX, e.pageY)
          console.log("client", e.clientX, e.clientY)
          console.log("movement", e.movementX, e.movementY)
          setPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
        }}
        onContextMenu={disableDefaultContextMenu} className="project-card">
      <ContextMenuTrigger>
        <Trigger onLeftClick={() => pushProject({ name: data.name, id: data.id })} XPos={pos.x} YPos={pos.y} />
      </ContextMenuTrigger>
      <button id="options-icon" onClick={() => setOpen(!open)}>
        <CogSixTooth />
      </button>
      <Modal open={open} setOpen={setOpen} title={"Details"}>
        <CardOptions data={data} />
      </Modal>

      <div
        onClick={() => pushProject({ name: data.name, id: data.id })}
        className="card"
      >
        <h4>{data.name}</h4>
        <div className="tags">{tags}</div>
        <p>{deadline}</p>
      </div>
    </div>
    <ProjectContextMenu project={data} />
    </ContextMenu>
  );
}
