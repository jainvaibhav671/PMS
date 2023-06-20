"use client";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Project } from "@prisma/client";

export default function Page({
  params
}: {
    params: {
    list_name: string
    }
}) {
  //  Correct the name
  // const name = params.list_name.replace("%20", " ");
  const [ currProj, setCurrProj ] = useState<Project | null>(null);

  useEffect(() => {
    setCurrProj(JSON.parse(sessionStorage.getItem("current-project")!))
  }, [])

  return <>
    <div id="app">
      {/* <Header list_name={name} list_id={id} /> */}
      {/* <Loading /> */}
      <Dashboard list_id={(currProj) ? currProj.id : ""} />
    </div>
  </>
}