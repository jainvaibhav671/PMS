import Dashboard from "../Dashboard/Dashboard";
import Grid from "../icons/Grid";

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
    component: <Dashboard current="" />,
    isActive: true,
  },
];
