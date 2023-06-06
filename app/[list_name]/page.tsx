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

    const name = params.list_name.replace("%20", " ")
    useEffect(() => {
        async function setup() {

            const {id: id} = await fetch(`/api/lists/query/${name}`).then(res => res.json());
            console.log(id);

            let t = await fetch(`/api/tasks/${id}`).then(res => res.json());
            console.log(t);
            setTasks(t);
        }

        setup();
    }, [name, setTasks])

    return <>
    <div id="app">
        <Header list_name={name} />
        <TaskList tasks={tasks}/>
    </div>
    </>
}