"use client";

import { useEffect, useState } from "react";
import { getLists } from "../utils/Database";

export default function Sidebar() {

    const [ lists, setLists ] = useState<Array<number>>([]);

    useEffect(() => {
        async function setup() {
            const l: Array<number> = await getLists();
            setLists(l);
        }
        setup();
    }, [setLists]);

    function createList() {
        const name = prompt("Enter name");
    }

    let list_buttons = lists.map( (
        l: any,
        idx: number
        ) => <li key={idx}><a href={`/${l}`}>{l}</a></li>)

    return (
        <>
        <div id="sidebar">
            <button onClick={createList} className="primary-button">New List</button>
            <ul>{list_buttons}</ul>
        </div>
        </>
    )
}