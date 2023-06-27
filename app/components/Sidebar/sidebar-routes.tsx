import Dashboard from "../Dashboard/Dashboard";

export interface Route {
  name: string;
  component: JSX.Element;
  href: string;
  isActive: boolean;
}

export const routes: Route[] = [
  {
    name: "Dashboard",
    href: "/",
    component: <Dashboard current="" />,
    isActive: true,
  },
];
