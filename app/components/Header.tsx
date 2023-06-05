export default function Header({
    list_name
}: {
    list_name: string
}) {
    return (
        <div id="header">
            <h2>{list_name}</h2>
        </div>
    )
}