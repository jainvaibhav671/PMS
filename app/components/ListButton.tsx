import Link from "next/link";
import { ListType } from "../interfaces/Lists";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeList, deleteList } from "@/features/listSlice";
import { useRef } from "react";

function MoreOptions({ list_id }: { list_id: number }) {

    const modalRef = useRef(null);
    const handleClick =  () => {
        const { current: el } = modalRef;
        if (el) {
            el.showModal();
        }
    };

    const dispatch = useAppDispatch();

    async function deleteItem() {

        const { current: el } = modalRef;

        await fetch(`/api/lists/delete/${list_id}`);
        dispatch(deleteList(list_id));
        el?.close();
    }

    return (
        <>
        <div id="more-options">
            <button onClick={handleClick}>:</button>
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
    list_data
}: {
    list_data: ListType
}) {
    
    const dispatch = useAppDispatch();

    async function deleteItem() {
        await fetch(`/api/lists/delete/${list_data.id}`);
        dispatch(deleteList(list_data.id));
    }

    const href = `/${list_data.list_name}`;
    return (
        <>
        <Link 
            onClick={() => dispatch(changeList(list_data.id))}
            className="sidebar-button" 
            href={href}>
            {list_data.list_name}
        </Link>

        {/* <button onClick={deleteItem}>Delete</button> */}
        <MoreOptions list_id={list_data.id} />
        </>
    )
}

export default function ListButtons({ list_data }: { list_data: ListType[] }) {

    const current = useAppSelector((state) => state.lists.current);
    let list_buttons = list_data.map( (l: ListType) => {
        const className = (l.id == current) ? "active-list" : "inactive-list";
        return <li className={className} key={l.id}>
            <ListButton list_data={l} />
        </li>
    });

    return (
        <ul>
            {list_buttons}
        </ul>
    )

}