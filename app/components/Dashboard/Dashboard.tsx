import { useAtomValue } from "jotai";
import { ActiveTab } from "@/lib/atoms";

import { tabs } from "@/lib/views"

export default function Dashboard() {
  const activeTab = useAtomValue(ActiveTab);
  return (
    <>
      {tabs[activeTab].component}
    </>
  );
}
