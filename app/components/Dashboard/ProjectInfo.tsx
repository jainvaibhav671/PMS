import { ProjectInfo } from "@/lib/database.types";

export default function ProjectInfo({ data }: { data: ProjectInfo }) {
  const tags = data.project_tags.map((pt) => (
    <span className="project-tag">{pt.Tag.name}</span>
  ));

  return (
    <>
      <div id="project-info">
        <h2>{data.name}</h2>
        <div>{tags}</div>
      </div>
    </>
  );
}
