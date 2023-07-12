import "./DropDown.css";

interface DropdownInterface {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}



export default function DropDown(props: DropdownInterface) {
    return <>
            <div className={`dropdown-menu ${(props.open) ? "open" : "close"}`}>
                {props.children}
            </div>
    </>
}