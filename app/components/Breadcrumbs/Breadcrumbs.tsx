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
      <>
        <span className="crumb" key={idx+20} onClick={() => jumpToProject(idx)}>
          {curr.name}
        </span>
        <span key={idx+21}>/</span>
      </>
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
