"use client";
import { Project } from "@prisma/client";
import Link from "next/link";

export function ProjectCard({
    data
}: {
    data: Project;
}) {

    const handleClick = () => {
        sessionStorage.setItem("current-project-id", data.id);
        sessionStorage.setItem("current-project-name", data.name);
        console.log(JSON.stringify(data))
    }

    return (
        <Link 
            onClick={handleClick} href={`${data.name}`}
            className="project-card"
        >
            <h4>{data.name}</h4>
            <span>{data.created_at?.toString()}</span>
        </Link>
    );
}
