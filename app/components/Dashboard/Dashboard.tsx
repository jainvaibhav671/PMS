import Sidebar from "../Sidebar/Sidebar";
import { useAtomValue } from "jotai";
import { ActiveTab } from "@/lib/atoms";
import BreadCrumbs from "../Breadcrumbs/Breadcrumbs";

export default function Dashboard() {
  const activeTab = useAtomValue(ActiveTab);
  return (
    <>
      <Sidebar />
      <BreadCrumbs />
      {activeTab}
    </>
  );
}
