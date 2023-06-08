"use client";

import { useState } from "react";
import ListButtons from "./ListButton";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ListType } from "../../interfaces/Lists";

export default function Sidebar() {

    const queryClient = useQueryClient();
    const [ list_name, setListName ] = useState("");

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["lists"],
        queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data)
    })

    const mutation = useMutation({
        mutationFn: () => axios.post("/api/lists/create", {
            list_name: list_name
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"]})
    })

    // TODO: make a loading component
    async function handleClick() {
        mutation.mutate();
    }

    return (
        <>
        <div id="sidebar">
            <div id="nl-input">
                <input 
                    type="text" 
                    onChange={e => setListName(e.target.value)}
                    placeholder="Enter List Name" />
                <button 
                    onClick={handleClick} 
                    className="primary-button">Add</button>
            </div>
            <ListButtons list_data={data!} />
        </div>
        </>
    )
}