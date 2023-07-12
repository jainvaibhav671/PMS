import "./Badge.css";
interface BadgeInterface {
  type: "tag" | "priority";
  text: string | null;
}
export default function Badge(props: BadgeInterface) {
  if (props.text === null) {
    return <></>;
  }
  if (props.type === "tag") {
    return <span className="tag">{props.text}</span>;
  }
  return (
    <span className={props.text.toLowerCase() + "-" + props.type.toLowerCase()}>
      {props.text}
    </span>
  );
}
