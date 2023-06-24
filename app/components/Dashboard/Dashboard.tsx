import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./Dashboard.css";
import { Project } from "@prisma/client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import CreateProject from "../Prompt/CreateProject/CreateProject";

export type ProjectMutationType = {
  name: string;
  parent_proj?: string;
};

export type TagMutationType = {
  tags: string[];
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

export default function Dashboard({ current = "" }: { current: string }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const apiUrl = "/api/lists" + `/${current}`;
  console.log("apiurl", apiUrl);
  const { data }: { data: Project[] | undefined } = useQuery({
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

  const TagMutation = useMutation({
    mutationFn: (variables: TagMutationType) =>
      axios
        .post("/api/tags/create", variables)
        .then((res) => res.data)
        .catch(() => {}),
  });

  const handleSubmit = (variables: ProjectMutationType | TagMutationType) => {
    console.log("Mutating", variables);

    if ("tags" in variables) {
      /* TagMutation.mutate(variables); */
      return;
    } else {
      ProjectMutation.mutate({
        ...variables,
        parent_proj: current.length == 0 ? null : current,
      });
    }
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
