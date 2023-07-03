import "./ProjectInfo.css"
import { ProjectInfo } from "@/lib/database.types";

export default function ProjectInfo({ data }: { data: ProjectInfo | undefined }) {
  const tags = data?.project_tags.map((pt) => (
    <span className="project-tag">{pt.Tag.name}</span>
  ));

  return (
    <>
      <div className="project-info">
          <h2>{(data?.isSubproject) ? "Task Name" : "Project Name"}</h2>
          <h2>{data?.name}</h2>
        <div className="row">
          <label htmlFor="tags">Tags</label>{tags}
        </div>
      </div>
    </>
  );
}
