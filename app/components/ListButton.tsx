import Link from "next/link";
import { ListType } from "../interfaces/Sidebar";

function ListButton({
    list_data
}: {
    list_data: ListType
}) {

    async function deleteItem() {
        await fetch(`/api/lists/delete/${list_data.id}`);
    }

    const href = `/${list_data.list_name}`;
    return (
        <>
        <Link className="sidebar-button" href={href}>
            {list_data.list_name}
        </Link>
        <button onClick={deleteItem}>Delete</button>
        </>
    )
}

export default function ListButtons({
    list_data,
}: {
    list_data: ListType[],
}) {

    let list_buttons = list_data.map( (l: ListType) => {
        return <li key={l.id}>
            <ListButton list_data={l} />
        </li>
    });

    return (
        <ul>
            {list_buttons}
        </ul>
    )

}