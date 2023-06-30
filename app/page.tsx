"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./components/Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Dashboard current={""} />
      <ReactQueryDevtools />
    </>
  );
}
