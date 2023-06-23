"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Login } from "./components/Login/Login";

export default function Home() {
  return (
    <main style={{ height: "100%", width: "100%" }}>
      <Login />
      <ReactQueryDevtools />
    </main>
  );
}
