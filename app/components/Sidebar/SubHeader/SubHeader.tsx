import { useEffect, useMemo, useState } from "react";
import "./SubHeader.css";
import { useAtom, useSetAtom } from "jotai";
import { ActiveTab } from "@/lib/atoms";

import { tabs } from "@/lib/views";

export default function SubHeader() {
  // List View is default view
  const [active,setActive] = useAtom(ActiveTab);

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
