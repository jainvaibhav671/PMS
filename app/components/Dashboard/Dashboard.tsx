"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"
import "./Dashboard.css";
import { Project } from "@prisma/client"
import Modal from "../Modal/Modal";
import Prompt from "../Prompt/Prompt";
import { useState } from "react";

function ProjectCard({
    data
}: {
    data: Project
}) {
    return (
        <a href={`${data.name}`} className="project-card">
            <h4>{data.name}</h4>
            <span>{data.created_at?.toString()}</span>
        </a>
    )
}

function ProjectGrid({
    projects
}: {
    projects: Project[]
}) {
    return (
        <>
            <div id="project-grid">
                {projects.map(p => <ProjectCard key={p.id} data={p}/>)}
            </div>
        </>
    )
}

export default function Dashboard() {

    const [ open, setOpen ] = useState(false);
    const [ name, setName ] = useState("");

    const queryClient = useQueryClient();
    const { data }: { data: Project[] | undefined } = useQuery({
        queryFn: () => axios.get("/api/lists").then(res => res.data),
        queryKey: ["lists"]
    })

    const mutation = useMutation({
        mutationFn: () => axios.post(
            "/api/lists/create",
            { project_name: name }, 
            {
                headers: { "Content-type": "application/json" }
            })
            .then(res => console.log(res.data))
            .catch(() => {}),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    })

    return (
        <>
            <h2>Projects</h2>
            <button 
                onClick={() => setOpen(!open)}
                className="primary-button">Add</button>
            <Modal title="New Project" open={open} setOpen={setOpen}>
                <Prompt label="Enter Project Name" setData={setName} onSubmit={() => mutation.mutate()} />
            </Modal>
            <div id="dashboard">
                {(!data) ? <Loading /> : <ProjectGrid projects={data} />}
            </div>
        </>
    )
}