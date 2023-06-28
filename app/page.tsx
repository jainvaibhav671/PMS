"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <main
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Sidebar />
        <Dashboard current={""} />
        <ReactQueryDevtools />
      </main>
    </>
  );
}
