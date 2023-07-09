import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { useAtomValue } from "jotai";
import { ActiveTab } from "@/lib/atoms";

export default function Dashboard() {
  const activeTab = useAtomValue(ActiveTab);
  return (
    <>
      <Sidebar />
      {activeTab}
    </>
  );
}
