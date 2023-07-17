import { Cross } from "../icons/icons";
import "./Badge.css";
type BadgeType = {
  type: "tag" | "priority";
  text: string | null;
} & (Tag | { type: "priority" })

type Tag = {
  type: "tag";
  removerFn: () => void
}

export default function Badge(props: BadgeType) {

  if (props.text === null) {
    return <></>;
  }
  
  if (props.type === "tag") {
    return <span className="tag badge">
      <span onClick={() => {props.removerFn()}}><Cross /></span>
      {props.text}
    </span>;
  }

  return (
    <span className={props.text.toLowerCase() + "-" + props.type.toLowerCase() + " badge"}>
      {props.text}
    </span>
  );
}
