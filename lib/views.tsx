import BoardView from "@/app/components/Dashboard/Views/BoardView/BoardView";
import ListView from "@/app/components/Dashboard/Views/ListView/ListView";
import TimelineView from "@/app/components/Dashboard/Views/TimelineView";

export const tabs = [
    { name: "List", component: <ListView /> },
    { name: "Board", component: <BoardView /> },
    { name: "Timeline", component: <TimelineView /> },
  ];