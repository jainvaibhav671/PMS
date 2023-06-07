"use client";
import { useEffect, useState } from "react"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ListType } from "@/app/interfaces/Lists";
import { TaskType } from "@/app/interfaces/Task";
import Header from "@/app/components/App/Header";
import TaskList from "@/app/components/App/TaskLists";

export default function Page({
    params
}: {
    params: {
        list_name: string
    }
}) {

    const name = params.list_name.replace("%20", " ");

    const query = useQuery({
        queryKey: ["lists"],
        queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data)
    });

    const id: number = query.data?.filter(l => l.list_name === name)[0].id!;
    const task_query = useQuery({
        queryKey: ["tasks", `${id}`],
        queryFn: (): Promise<TaskType[]> => axios.get(`/api/tasks/${id}`).then(res => res.data)
    });
    if (query.isLoading || query.isFetching) return <h1>Loading</h1>;
    let tasks = (task_query.data) ? task_query.data : []

    return <>
    <div id="app">
        <Header list_name={name} list_id={id} />
        {(task_query.isLoading) ? <h2>Loading</h2> :<TaskList tasks={tasks}/>}
    </div>
    </>
}