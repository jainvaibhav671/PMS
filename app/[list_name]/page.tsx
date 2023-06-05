"use client";
import { useEffect, useState } from "react"
import { getTasks } from "../utils/Database"
import TaskList from "../components/TaskLists";
import Header from "../components/Header";

export default function Page({
    params
}: {
    params: {
        list_name: string
    }
}) {

    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        async function setup() {

            const r = await fetch(`/api/lists/query/${params.list_name}`).then(res => res.json());

            let t = await fetch(`/api/tasks/${r.id}`).then(res => res.json());
            console.log(t);
            setTasks(t);
        }

        setup();
    }, [params.list_name, setTasks])

    return <>
    <div id="app">
        <Header list_name={params.list_name} />
        <TaskList tasks={tasks}/>
    </div>
    </>
}