import { useAtomValue } from "jotai";
import { ActiveTab } from "@/lib/atoms";

import { tabs } from "@/lib/views";
import Sidebar from "../Sidebar/Sidebar";
import BreadCrumbs from "../Breadcrumbs/Breadcrumbs";

export default function Dashboard() {
  const activeTab = useAtomValue(ActiveTab);
  return (
    <>
      <Sidebar />
      <BreadCrumbs />
      {tabs[activeTab].component}
    </>
  );
}
