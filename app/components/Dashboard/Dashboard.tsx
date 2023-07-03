import Loading from "../Loading/Loading";
import "./Dashboard.css";
import { ProjectCard } from "./ProjectCard";
import { createContext, useContext } from "react";
import { Project } from "@/lib/database.types";
import { GetAllProjects, GetProject, GetProjectInfo } from "@/lib/queries";
import Sidebar from "../Sidebar/Sidebar";
import ProjectInfo from "./ProjectInfo/ProjectInfo";

export const ProjectContext = createContext<string | null>(null);

export type ProjectMutationType = {
  name: string;
  parent_proj?: string | null;
  tags?: string[];
};

function ProjectGrid({ projects }: { projects: Project[] | undefined }) {
  return (
    <>
      {(!projects) ? "No projects to show" :
      <div id="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} data={p} />
        ))}
      </div>}
    </>
  );
}

export function DashboardWrapper() {
  const current = useContext(ProjectContext) as string;
  const { data: currProj, isLoading: isCurrProjLoading } =
    GetProjectInfo(current);
  const projectInfo = <ProjectInfo data={currProj} />;

  const { data, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  return (
    <>
      <div id="dashboard">
        {/* Project Info */}
        {current.length == 0 || currProj ? (
          "Dashboard"
        ) : isCurrProjLoading ? (
          <Loading />
        ) : (
          projectInfo
        )}

        {isLoading ? <Loading /> :
          <ProjectGrid projects={data} />
        }
      </div>
    </>
  );
}

export default function Dashboard({ current }: { current: string }) {
  return (
    <ProjectContext.Provider value={current}>
      {current}
      <Sidebar />
      <DashboardWrapper />
    </ProjectContext.Provider>
  );
}
