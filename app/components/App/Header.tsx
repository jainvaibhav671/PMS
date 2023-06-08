import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Header({
    list_name,
    list_id
}: {
    list_name: string,
    list_id: number
}) {

    const queryClient = useQueryClient();
    const [ taskName, setTaskName ] = useState("");

    const mutation = useMutation({
        mutationFn: () => axios.post("/api/tasks/create", {
            task_name: taskName,
            list_id: list_id,
            isCompleted: false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"]})
    })

    async function handleClick() {
        // TODO: show modal
        const task = prompt("Enter task");
        if (!task) return;

        setTaskName(task);
        mutation.mutate();
    }

    return (
        <div id="header">
            <h2>{list_name}</h2>
            <button onClick={handleClick}>+ New Task</button>
        </div>
    )
}
