"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Loading from "../Loading/Loading";
import { Project } from "@/lib/database.types";
import Eye from "../icons/Eye";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CardOptions from "./CardOptions/CardOptions";

export function Tag({ tag_name }: { tag_name: string }) {
  return <span className="project-tag">{tag_name}</span>;
}

export function ProjectCard({ data }: { data: Project }) {
  const [open, setOpen] = useState(false);
  const created_at = new Date(data.created_at!);
  const date = `${created_at.toLocaleString("default", {
    dateStyle: "medium",
  })}`;

  const { isLoading, data: tags_list } = useQuery({
    queryKey: ["tags", data.id],
    queryFn: (): Promise<string[]> =>
      axios.get(`/api/tags/${data.id}`).then((res) => res.data),
  });

  const tags = tags_list?.map((t, idx) => <Tag key={idx} tag_name={t} />);

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
        <Eye />
      </button>
      <Modal open={open} setOpen={setOpen} title={"Details"}>
        <CardOptions data={data} />
      </Modal>

      <Link href={`/${data.id}`}>
        <h4>{data.name}</h4>
        <div id="tags">{tags}</div>
        <p>{date}</p>
      </Link>
    </div>
  );
}
