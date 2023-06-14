"use client";

import { FormEvent, useState } from "react";
import ListButtons from "./ListButton";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ListType } from "../../interfaces/Lists";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import Prompt from "../Prompt/Prompt";

export default function Sidebar() {

    const queryClient = useQueryClient();
    const [ list_name, setListName ] = useState("");
    const [ open, setOpen ] = useState(false);

    const { isLoading, data } = useQuery({
        queryKey: ["lists"],
        queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data),

    })

    // const mutation = useMutation({
    //     mutationFn: () => axios.post(
    //         "/api/lists/create", { list_name: list_name }, { headers: { "Conent-type": "application/json" } })
    //         .then(res => console.log(res.data)),
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
    // })

    const mutation = useMutation({
        mutationFn: () => fetch("/api/lists/create", {
            method: "POST",
            body: JSON.stringify({ list_name: list_name }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] })
    })

    // TODO: make a loading component
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("List Name", list_name)
        mutation.mutate();
    }
    
    return (
        <>
        <div id="sidebar">
            <button 
                onClick={() => setOpen(!open)}
                className="primary-button">Add</button>
            <Modal title="New List" open={open} setOpen={setOpen}>
                <Prompt label="Enter List Name" setData={setListName} onSubmit={onSubmit} />
            </Modal>
            {(isLoading) ? <Loading /> : <ListButtons list_data={data!} />}
        </div>
        </>
    )
}
