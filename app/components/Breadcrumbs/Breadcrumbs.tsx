import { NavHistory, useJumpToProject, usePopProject } from "@/lib/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import "./BreadCrumbs.css";
import { ArrowSmallLeft } from "../icons/icons";

export default function BreadCrumbs() {
  const history = useAtomValue(NavHistory);

  const jumpToProject = useJumpToProject();
  const popProject = usePopProject();

  const elems = history.map((curr, idx) => {
    return (
      <span key={idx}>
        <span className="crumb" onClick={() => jumpToProject(idx)}>
          {curr.name}
        </span>
        <span>/</span>
      </span>
    );
  });

  return (
    <div className="breadcrumbs">
      <button onClick={popProject}>
        <ArrowSmallLeft />
      </button>
      {elems}
    </div>
  );
}
