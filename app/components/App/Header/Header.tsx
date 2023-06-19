import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import CreateTask from "../../Prompt/CreateTask/CreateTask";
import { ListType } from "@/app/interfaces/Lists";

export default function Header({
    list_name,
    list_id
}: {
    list_name: string,
    list_id: number
}) {

    const queryClient = useQueryClient();
    const [ listName, setListName] = useState("");
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
        }).then(res => res.data).catch(() => {}),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", list_id]})
    })

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        console.log("Mutating", taskName)
        mutation.mutate();
    }

    const {data: lists, isFetching} = useQuery({
        queryKey: ["lists"],
        queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data).catch(() => {})
    });

    useEffect(() => {
        const id = parseInt(sessionStorage.getItem("currentList")!)
        const list = lists?.filter(l => l.id === id)[0];
        setListName(list?.list_name!);
    }, [lists, isFetching])
    
    return (
        <div id="header">
            <h2>{listName}</h2>
            <button onClick={() => setOpen(!open)}>+ New Task</button>
            <Modal open={open} setOpen={setOpen} title={"New Task"}>
                <CreateTask controller={setTaskName} onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}
