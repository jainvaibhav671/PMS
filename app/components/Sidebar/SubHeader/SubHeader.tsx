import { useEffect, useMemo, useState } from "react";
import "./SubHeader.css";
import { useSetAtom } from "jotai";
import { ActiveTab } from "@/lib/atoms";
import ListView from "../../Dashboard/Views/ListView/ListView";
import BoardView from "../../Dashboard/Views/BoardView/BoardView";
import TimelineView from "../../Dashboard/Views/TimelineView";

export default function SubHeader() {
  // List View is default view
  const setActiveTab = useSetAtom(ActiveTab);
  const [active, setActive] = useState(0);
  const tabs = useMemo(() => [
    { name: "List", component: <ListView /> },
    { name: "Board", component: <BoardView /> },
    { name: "Timeline", component: <TimelineView /> },
  ], []);

  useEffect(() => {
    setActiveTab(tabs[active].component);
  }, [active, setActiveTab, tabs]);

  return (
    <div className="sub-header">
      <ul className="views">
        {tabs.map((tab, idx) => {
          return (
            <li
              key={idx}
              className={active === idx ? "active tab" : "tab"}
              onClick={() => setActive(idx)}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
