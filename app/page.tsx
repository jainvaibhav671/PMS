"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { ActivePage, CurrentProjectAtom } from "@/lib/atoms";

import { routes as SidebarRoutes } from "@/lib/sidebar-routes";
export default function Home() {
  useSetAtom(CurrentProjectAtom)("");
  const activePage = useAtomValue(ActivePage);

  return <>{SidebarRoutes[activePage].component}</>;
}
