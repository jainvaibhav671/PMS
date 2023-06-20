"use client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"
import "./Dashboard.css";
import { Projects } from "@prisma/client"

function ProjectCard({
    data
}: {
    data: Projects
}) {
    return (
        <a href={`${data.name}`} className="project-card">
            <h4>{data.name}</h4>
            <span>{data.created_at.toString()}</span>
        </a>
    )
}

function ProjectGrid({
    projects
}: {
    projects: Projects[]
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

    const { data }: { data: Projects[] | undefined } = useQuery({
        queryFn: () => axios.get("/api/lists").then(res => res.data),
        queryKey: ["lists"]
    })

    return (
        <>
            <h2>Projects</h2>
            <button className="secondary-button">New Project</button>
            <div id="dashboard">
                {(!data) ? <Loading /> : <ProjectGrid projects={data} />}
            </div>
        </>
    )
}