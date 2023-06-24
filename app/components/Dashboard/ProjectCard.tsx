"use client";
import { Project } from "@prisma/client";
import Link from "next/link";

export function ProjectCard({ data }: { data: Project }) {
  const created_at = new Date(data.created_at!);
  const date = `${created_at.getDate()}`;
  return (
    <Link href={`/${data.id}`} className="project-card">
      <div>
        <h4>{data.name}</h4>
        <span>
          {created_at.toLocaleString("default", { dateStyle: "medium" })}
        </span>
      </div>
      {/* <progress value="2" max="9"></progress> */}
    </Link>
  );
}
