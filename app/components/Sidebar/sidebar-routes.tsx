import Dashboard from "../Dashboard/Dashboard";
import { Grid } from "../icons/icons";

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
];
