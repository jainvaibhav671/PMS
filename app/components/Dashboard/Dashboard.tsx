import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./Dashboard.css";
import Modal from "../Modal/Modal";
import { ProjectCard } from "./ProjectCard";
import CreateProject from "../Prompt/CreateProject/CreateProject";
import {
  StoreContextProvider,
  useCurrentProject,
  useSetCurrentProject,
} from "@/app/utils/currentProjectProvider";
import { useState } from "react";

export type ProjectMutationType = {
  name: string;
  parent_proj?: string | null;
  tags?: string[];
};

function ProjectGrid({ projects }: { projects }) {
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
  const current = useCurrentProject()!;
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const apiUrl = current.length == 0 ? "/api/lists" : `/api/lists/${current}`;
  console.log("apiUrl", apiUrl);
  const { data } = useQuery({
    queryFn: () => axios.get(apiUrl).then((res) => res.data),
    queryKey: ["lists"],
  });

  const ProjectMutation = useMutation({
    mutationFn: (variables: ProjectMutationType) =>
      axios
        .post("/api/lists/create", variables)
        .then((res) => res.data)
        .catch(() => {}),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });

  const handleSubmit = (variables: ProjectMutationType) => {
    console.log("Mutating", variables);
    ProjectMutation.mutate({
      ...variables,
      parent_proj: current.length == 0 ? null : current,
    });
  };

  return (
    <>
      <h2>{"Dashboard"}</h2>
      <button onClick={() => setOpen(!open)} className="primary-button">
        Add
      </button>
      <Modal title="New Project" open={open} setOpen={setOpen}>
        <CreateProject
          closeDialog={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
      <div id="dashboard">
        Items
        {!data ? <Loading /> : <ProjectGrid projects={data} />}
      </div>
    </>
  );
}

export default function Dashboard({ current = "" }: { current: string }) {
  useSetCurrentProject(current);

  return (
    <StoreContextProvider>
      <DashboardWrapper />
    </StoreContextProvider>
  );
}
