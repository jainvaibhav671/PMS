"use client";
import { useEffect, useState } from "react"
import { getTasks } from "../utils/Database"
import TaskList from "../components/TaskLists";
import Header from "../components/Header";

export default function Page({
    params
}: {
    params: {
        list_name: number
    }
}) {

    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        async function setup() {
            // let t = await getTasks({ list_id: params.list_name });

            let t = await fetch(`/api/tasks/${params.list_name}`).then(res => res.json());

            console.log(t);
            setTasks(t);
        }

        setup();
    }, [params.list_name, setTasks])

    return <>
    <div id="app">
        <Header />
        <TaskList tasks={tasks}/>
    </div>
    </>
}