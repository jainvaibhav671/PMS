"use client";
import React, { RefObject, useState } from "react";
import "./Sidebar.css";
import { Route, routes } from "./sidebar-routes";
import Link from "next/link";
import Header from "./Header/Header";
import SubHeader from "./SubHeader/SubHeader";

function SidebarItem({
  onClick,
  route,
}: {
  onClick: () => void;
  route: Route;
}) {
  return (
    <li
      className="primary-button"
      onClick={onClick}
      id={route.isActive ? "active" : ""}
    >
      <Link href={route.href}>{route.name}</Link>
    </li>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  function ItemOnClick(idx: number) {
    setActive(idx);
  }

  return (
    <div className="sidebar-main">
      <Header open={open} setOpen={setOpen} />
      <SubHeader />
      <hr />
      <div className={`sidebar sidebar-${open ? "open" : "close"}`}>
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
    </div>
  );
}
