import { Dispatch, SetStateAction } from "react"
import "./Prompt.css"

export default function Prompt({
    label,
    setData,
    onSubmit
}: {
    label: string,
    setData: Dispatch<SetStateAction<string>>,
    onSubmit: Function
}) {

    const func = () => {
        console.log("Submitting");
        onSubmit();
    }

    return (
        <form method="POST" onSubmit={func} id="prompt">
            <div>
                <label htmlFor="inp">{label}</label>
                <input id="inp"  onChange={(e) => { setData(e.target.value) }} type="text" name="inp" autoFocus/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}