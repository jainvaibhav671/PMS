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

    useEffect(() => {
        getLists().unwrap().then(data => {
            console.log(data);
            dispatch(setLists(data));
        });
    }, [setLists, getLists])

    async function handleClick() {
        const name = prompt("Enter name");
        if (name) {
            let list_data = await addList({ list_name: name });
            dispatch(createList(name));
        }
    }

    return (
        <>
        <div id="sidebar">
            <button onClick={handleClick} className="primary-button">New List</button>
            <ListButtons list_data={listsState.lists} />
        </div>
        </>
    )
}