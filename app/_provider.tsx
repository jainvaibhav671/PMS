"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";
import Navbar from "./components/Navbar/Navbar";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode}) {

  return <QueryClientProvider client={queryClient} >
    <Navbar />
    <div style={{height: "100%", width: "100%"}}>
      <Sidebar />
      {children}
    </div>
  </QueryClientProvider>
}
