export default function Page({
    params
}: {
    params: {
        list_name: string
    }
}) {

    return <h1>Page: { params.list_name }</h1>
}