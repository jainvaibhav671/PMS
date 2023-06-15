import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Prompt from "../Prompt/Prompt";

export default function Header({
    list_name,
    list_id
}: {
    list_name: string,
    list_id: number
}) {

    const queryClient = useQueryClient();
    const [ taskName, setTaskName ] = useState("");
    const [ open, setOpen ] = useState(false);

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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", list_id]})
    })

    function onSubmit() {
        console.log("Mutating")
        mutation.mutate();
    }

    return (
        <div id="header">
            <h2>{list_name}</h2>
            <button onClick={() => setOpen(!open)}>+ New Task</button>
            <Modal open={open} setOpen={setOpen} title={"New Task"}>
                <Prompt label={"Enter New Task"} setData={setTaskName} onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}
