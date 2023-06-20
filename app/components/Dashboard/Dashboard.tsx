"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"
import "./Dashboard.css";
import { Project } from "@prisma/client"
import Modal from "../Modal/Modal";
import Prompt from "../Prompt/Prompt";
import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";

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

export default function Dashboard({ list_id="" }: { list_id?: string }) {

    const [ open, setOpen ] = useState(false);
    const [ name, setName ] = useState("");

    const queryClient = useQueryClient();
    const apiUrl = "/api/lists" + ( (list_id.length != 0) ? `/${list_id}` : "")
    const { data }: { data: Project[] | undefined } = useQuery({
        queryFn: () => axios.get(apiUrl).then(res => res.data),
        queryKey: ["lists"].concat((list_id.length == 0) ? [] : [list_id])
    })

    const mutation = useMutation({
        mutationFn: () => axios.post(
            "/api/lists/create",
            {
                project_name: name,
                parent_proj: list_id
            }, 
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