"use client";
import Loading from "../Loading/Loading";
import { Project } from "@/lib/database.types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CardOptions from "./CardOptions/CardOptions";
import { GetTags } from "@/lib/queries";
import { CogSixTooth } from "../icons/icons";
import { usePushProject } from "@/lib/atoms";

export function Tag({ tag_name }: { tag_name: string }) {
  return <span className="project-tag">{tag_name}</span>;
}

export function ProjectCard({ data }: { data: Project }) {
  const [open, setOpen] = useState(false);
  const deadline = data.deadline
    ? `${new Date(data.deadline).toLocaleString("default", {
        dateStyle: "medium",
      })}`
    : "No due date";

  const { tagsList, isLoading } = GetTags(data.id);
  const tags = tagsList?.map((t, idx) => <Tag key={idx} tag_name={t} />);
  const pushProject = usePushProject();

  if (isLoading) {
    return (
      <a className="project-card" href="">
        <Loading />
      </a>
    );
  }


  return (
    <div className="project-card">
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
  );
}
