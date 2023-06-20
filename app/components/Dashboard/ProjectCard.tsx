"use client";
import { Project } from "@prisma/client";

export function ProjectCard({
    data
}: {
    data: Project;
}) {

    const handleClick = () => {
        sessionStorage.setItem("current-project", JSON.stringify(data));
        console.log(JSON.stringify(data))
    }

    return (
        <a onClick={handleClick} href={`${data.name}`} className="project-card">
            <h4>{data.name}</h4>
            <span>{data.created_at?.toString()}</span>
        </a>
    );
}
