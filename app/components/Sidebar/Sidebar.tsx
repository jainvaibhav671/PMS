import React, { useState } from "react";
import "./Sidebar.css";
import { Route, routes } from "./sidebar-routes";
import Link from "next/link";

function SidebarItem({
  onClick,
  route,
}: {
  onClick: () => void;
  route: Route;
}) {
  return (
    <li onClick={onClick} id={route.isActive ? "active" : ""}>
      <Link href={route.href}>{route.name}</Link>
    </li>
  );
}

function SidebarToggle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function Header() {
  return (
    <>
      <div id="header">
        <SidebarToggle />
      </div>
    </>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState(0);

  function ItemOnClick(idx: number) {
    setActive(idx);
  }

  return (
    <>
      <Header />
      <div id={`sidebar`}>
        <ul>
          {routes.map((route, idx) => {
            route.isActive = idx == active;
            return (
              <SidebarItem
                key={idx}
                onClick={() => ItemOnClick(idx)}
                route={route}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
