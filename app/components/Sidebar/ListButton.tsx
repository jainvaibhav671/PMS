import Link from "next/link";
import { ListType } from "@/app/interfaces/Lists";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../Loading/Loading";

function MoreOptions({ list_id }: { list_id: number }) {

    const queryClient = useQueryClient();
    const modalRef = useRef<HTMLDialogElement>(null);
    const handleClick =  () => {
        const { current: el } = modalRef;
        if (el) {
            el.showModal();
        }
    };

    async function deleteItem() {

        const { current: el } = modalRef;
        await fetch(`/api/lists/delete/${list_id}`);
        queryClient.invalidateQueries({
            queryKey: ["lists"]
        })
        // TODO: Show Modal
        el?.close();
    }

    return (
        <>
        <div id="more-options">
            <button className="more-options-button" onClick={handleClick}>:</button>
            <dialog ref={modalRef}>
                <span>Options: </span>
                <ul>
                    <li><button onClick={deleteItem}>Delete Item</button></li>
                    <li><button>Delete Item</button></li>
                    <li><button>Delete Item</button></li>
                </ul>
            </dialog>
        </div>
        </>
    )
}

function ListButton({
    list_data,
    currentActive,
    handleClick
}: {
    list_data: ListType,
    currentActive: number,
    handleClick: Function
}) {
    
    const href = `/${list_data.list_name}`;
    return (
        <>
        <Link 
            onClick={() => handleClick(list_data.id)}
            className="sidebar-button" 
            href={href}>
            {list_data.list_name}
        </Link>
        {(currentActive == list_data.id) ? <MoreOptions list_id={list_data.id} /> : ""}
        </>
    )
}

export default function ListButtons({ list_data }: { list_data: ListType[] }) {

    const { data } = useQuery({
        queryKey: ["lists"],
        queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data)
    })

    const [ currentActive, setCurrentActive ] = useState(-1);
    function changeList(id: number) {
        setCurrentActive(id);
    }

    if (!data) return <Loading />;

    let list_buttons = data?.map( (l: ListType) => {
        const className = (l.id == currentActive) ? "active-list" : "inactive-list";
        return <li className={className} key={l.id}>
            <ListButton list_data={l} currentActive={currentActive} handleClick={changeList} />
        </li>
    });

    return (
        <ul>
            {list_buttons}
        </ul>
    )

}