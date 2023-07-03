import Loading from "../Loading/Loading";
import "./Dashboard.css";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/lib/database.types";
import { GetAllProjects, GetProject, GetProjectInfo } from "@/lib/queries";
import Sidebar from "../Sidebar/Sidebar";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";

export type ProjectMutationType = {
  name: string;
  parent_proj?: string | null;
  tags?: string[];
};

function ProjectGrid({ projects }: { projects: Project[] | undefined }) {
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

export function DashboardWrapper() {
  const current = useAtomValue(CurrentProjectAtom);
  const { data: currProj, isLoading: isCurrProjLoading } =
    GetProjectInfo(current);
  console.log("currproj", currProj);
  const { data, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  return (
    <>
      <div id="dashboard">
        {current.length == 0 ? (
          <h2>Dashboard</h2>
        ) : isCurrProjLoading ? (
          <Loading />
        ) : (
          <ProjectInfo data={currProj} />
        )}
        {isLoading ? <Loading /> : <ProjectGrid projects={data} />}
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <DashboardWrapper />
    </>
  );
}
