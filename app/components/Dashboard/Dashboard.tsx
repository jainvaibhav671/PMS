"use client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loading from "../Loading/Loading"
import { ListType } from "@/app/interfaces/Lists"
import "./Dashboard.css";

function ProjectCard({
    data
}: {
    data: ListType
}) {
    return (
        <a href={`${data.list_name}`} className="project-card">
            <h4>{data.list_name}</h4>
        </a>
    )
}

function ProjectGrid({
    projects
}: {
    projects: ListType[]
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

    const { data, isLoading, isFetching } = useQuery({
        queryFn: () => axios.get("/api/lists").then(res => res.data),
        queryKey: ["lists"]
    })

    return (
        <>
            <h2>Projects</h2>
            <button className="secondary-button">New Project</button>
            <div id="dashboard">
                {(isLoading || isFetching) ? <Loading /> : <ProjectGrid projects={data} />}
            </div>
        </>
    )
}