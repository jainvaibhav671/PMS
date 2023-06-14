"use client";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode}) {

  return <QueryClientProvider client={queryClient} >
    <Sidebar />
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
}
