import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./Dashboard.css";
import { ProjectCard } from "./ProjectCard";
import { createContext, useContext } from "react";
import { Project } from "@/lib/database.types";
import { GetAllProjects, GetProject } from "@/lib/queries";
import Sidebar from "../Sidebar/Sidebar";

export const ProjectContext = createContext<string | null>(null);

export type ProjectMutationType = {
  name: string;
  parent_proj?: string | null;
  tags?: string[];
};

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <>
      <div id="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} data={p} />
        ))}
      </div>
    </>
  );
}

export function DashboardWrapper() {
  const current = useContext(ProjectContext) as string;

  const apiUrl = current.length == 0 ? "/api/lists" : `/api/lists/${current}`;
  console.log("apiUrl", current.length, apiUrl);
  const { data, isLoading } =
    current.length == 0 ? GetAllProjects() : GetProject(current);

  return (
    <>
      <div id="dashboard">
        <h1>{"Dashboard"}</h1>
        {isLoading ? (
          <Loading />
        ) : data?.length == 0 ? (
          "No Projects to show. Create a new Project"
        ) : (
          <ProjectGrid projects={data!} />
        )}
      </div>
    </>
  );
}

export default function Dashboard({ current }: { current: string }) {
  return (
    <ProjectContext.Provider value={current}>
      <Sidebar />
      <DashboardWrapper />
    </ProjectContext.Provider>
  );
}
