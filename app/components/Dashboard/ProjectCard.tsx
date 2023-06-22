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

    const created_at = new Date(data.created_at!);
    const date = `${created_at.getDate()}`
    return (
        <Link 
            onClick={handleClick} href={`${data.name}`}
            className="project-card"
        >
            <div>
                <h4>{data.name}</h4>
                <span>{created_at.toLocaleString("default", { dateStyle: "medium" })}</span>
            </div>
            <progress value="2" max="9"></progress>
        </Link>
    );
}
