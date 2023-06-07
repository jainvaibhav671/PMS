"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode}) {
    return <QueryClientProvider client={queryClient} >
          <Sidebar />
          {children}
        </QueryClientProvider>
}