"use client";

import { useEffect, useState } from "react";
import ListButtons from "./ListButton";

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { createList, setLists } from "@/features/listSlice";
import { useLazyFetchListsQuery } from "@/features/getListAPI";
import { addList } from "../utils/Database";

export default function Sidebar() {

    const listsState = useAppSelector((state) => state.lists );
    const dispatch = useAppDispatch();
    const [ getLists ] = useLazyFetchListsQuery();

    const [ list_name, setListName ] = useState("");

    useEffect(() => {
        getLists().unwrap().then(data => {
            dispatch(setLists(data));
        });
    }, [setLists, getLists, dispatch])

    async function handleClick() {
        const name = list_name;
        if (name) {
            const data = await addList({ list_name: name });
            if (!data) {
                return;
            }

            dispatch(createList(data));
        }
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
            <ListButtons list_data={listsState.lists} />
        </div>
        </>
    )
}