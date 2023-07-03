"use client";
import Dashboard from "./components/Dashboard/Dashboard";
import { useSetAtom } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";

export default function Home() {
  useSetAtom(CurrentProjectAtom)("");

  return (
    <>
      <Dashboard />
    </>
  );
}
