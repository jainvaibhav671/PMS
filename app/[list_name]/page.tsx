"use client";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Page({
  params
}: {
    params: {
    list_name: string
    }
}) {
  //  Correct the name
  // const name = params.list_name.replace("%20", " ");

  return <>
    <div id="app">
      {/* <Header list_name={name} list_id={id} /> */}
      {/* <Loading /> */}
      {/* <Dashboard /> */}
    </div>
  </>
}