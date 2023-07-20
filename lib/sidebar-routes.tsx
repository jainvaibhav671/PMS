import Dashboard from "../app/components/Dashboard/Dashboard";
import { Grid } from "../app/components/icons/icons";

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
    name: <>{"Roles"}</>,
    component: <h2>Roles</h2>,
    href: "/",
    isActive: false
  }
];
