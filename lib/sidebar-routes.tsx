import { Roles } from "@/components/Roles/Roles";
import Dashboard from "../app/components/Dashboard/Dashboard";
import { Grid } from "../app/components/icons/icons";
import { LockIcon } from "lucide-react";

export interface Route {
  name: JSX.Element;
  component: JSX.Element;
  href: string;
  isActive: boolean;
}

export const routes: Route[] = [
  {
    name: (
      <>
        <Grid /> {"Dashboard"}
      </>
    ),
    href: "/",
    component: <Dashboard />,
    isActive: true,
  },
  {
    name: (
      <>
        <LockIcon /> {"Roles"}
      </>
    ),
    component: <Roles />,
    href: "/",
    isActive: false,
  },
];
