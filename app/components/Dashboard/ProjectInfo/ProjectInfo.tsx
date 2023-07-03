import "./ProjectInfo.css";
import { ProjectInfo, Tag } from "@/lib/database.types";

export default function ProjectInfo({
  data,
}: {
  data: ProjectInfo | undefined;
}) {
  if (!data) return <></>;
  const tags = data?.project_tags.map((pt, idx) => (
    <span key={idx} className="project-tag">
      {pt.Tag.name}
    </span>
  ));

  const date = new Date(data?.created_at!).toLocaleString("default", {
    dateStyle: "medium",
  });

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
        <div className="tags">{tags}</div>
      </div>
    </>
  );
}
