"use client";
import Dashboard from "../components/Dashboard/Dashboard";
import { useSetAtom } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";
import { useEffect } from "react";

export default function Page({
  params,
}: {
  params: {
    current_id: string;
  };
}) {
  const setCurrentProject = useSetAtom(CurrentProjectAtom);
  setCurrentProject(params.current_id); // update the atom

  return (
    <>
      <div id="app">
        <Dashboard />
      </div>
    </>
  );
}
