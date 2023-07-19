interface TriggerInterface {
  onLeftClick: Function;
  XPos: string;
  YPos: string;
}

export function Trigger({ onLeftClick, XPos, YPos }: TriggerInterface) {
  const styles: React.CSSProperties = {
    position: "fixed",
    left: XPos,
    top: YPos,
    width: "2px",
    height: "2px",
    border: "2px solid black",
    cursor: "pointer",
  };

  return <div onClick={() => onLeftClick()} style={styles}></div>;
}
