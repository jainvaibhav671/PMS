import Badge from "../../Badge/Badge"

interface PriorityMenuInterface {
    setValue: React.Dispatch<React.SetStateAction<string>>
}
export default function PriorityMenu(props: PriorityMenuInterface) {

    const priorities = [
        "High", "Medium", "Low"
    ]
    
    

    return (
        <ul>
            {priorities.map((p, idx) => {
                const badge = <Badge text={p} type="priority" />
                return (
                    <li onClick={() => props.setValue(priorities[idx])} key={idx}>
                        {badge}
                    </li>
                )
            })}
        </ul>
    )
}