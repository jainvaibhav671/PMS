"use client";

import { useEffect, useState } from "react";
import ListButtons from "./ListButton";
import { ListType } from "../interfaces/Sidebar";

export default function Sidebar() {

    const [ lists, setLists ] = useState<Array<ListType>>([]);

    useEffect(() => {
        async function setup() {
            const l: Array<ListType> = await fetch("/api/lists")
                .then( res => res.json());

            console.log(l);
            setLists(l);
        }
        setup();
    }, [setLists]);

    function createList() {
        const name = prompt("Enter name");
        // TODO: shift to server
        if (name) {
            setLists([
                ...lists,
                {
                    list_name: name,
                    idx: lists.length
                }
            ])
        }
    }

    return (
        <>
        <div id="sidebar">
            <button onClick={createList} className="primary-button">New List</button>
            <ListButtons list_data={lists} />
        </div>
        </>
    )
}