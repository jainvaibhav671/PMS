"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Loading from "../Loading/Loading";

export function Tag({ tag_name }: { tag_name: string }) {
  return <span className="project-tag">{tag_name}</span>;
}

export function ProjectCard({ data }: { data }) {
  const created_at = new Date(data.created_at!);
  const date = `${created_at.toLocaleString("default", {
    dateStyle: "medium",
  })}`;

  console.log(data.id);
  const { isLoading, data: tags_list } = useQuery({
    queryKey: ["tags", data.id],
    queryFn: (): Promise<string[]> =>
      axios.get(`/api/tags/${data.id}`).then((res) => res.data),
  });

  console.log(tags_list);
  const tags = tags_list?.map((t, idx) => <Tag key={idx} tag_name={t} />);

  return (
    <Link href={`/${data.id}`} className="project-card">
      <h4>{data.name}</h4>
      <div>{isLoading ? <Loading /> : tags}</div>
      <p>{date}</p>
    </Link>
  );
}
