import { CurrentProjectAtom } from "@/lib/atoms";
import { ProjectInfoType } from "@/lib/database.types";
import { GetProjectInfo, GetAllProjects, GetProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import Loading from "../../../Loading/Loading";
import { ProjectCard } from "./ProjectCard";
import ProjectInfo from "./ProjectInfo/ProjectInfo";

import "./BoardView.css";

function ProjectGrid({ projects }: { projects: ProjectInfoType[] | undefined }) {
  return (
    <>
      {!projects ? (
        "No projects to show"
      ) : (
        <div id="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} data={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default function BoardView() {
  const current = useAtomValue(CurrentProjectAtom);
  const { data: currProj, isLoading: isCurrProjLoading } =
    GetProjectInfo(current);
  const { data, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  return (
    <>
      <div id="dashboard">
        {current.length == 0 ? (
          <h2>Dashboard</h2>
        ) : isCurrProjLoading || !currProj ? (
          <Loading />
        ) : (
          <ProjectInfo data={currProj} />
        )}
        {isLoading ? <Loading /> : <ProjectGrid projects={data} />}
      </div>
    </>
  );
}
