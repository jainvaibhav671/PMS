"use client";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Page({
  params,
}: {
  params: {
    current_id: string;
  };
}) {
  return (
    <>
      <div id="app">
        <Dashboard current={params.current_id} />
      </div>
    </>
  );
}
