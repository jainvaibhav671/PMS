import { Dispatch, SetStateAction } from "react"

export default function Prompt({
    label,
    setData
}: {
    label: string,
    setData: Dispatch<SetStateAction<string>>
}) {

    return (
        <>
            <label htmlFor="inp">{label}</label>
            <input onChange={(e) => setData(e.target.value)} type="text" name="inp" />
        </>
    )
}