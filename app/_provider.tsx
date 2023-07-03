"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "jotai";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <div style={{ height: "100%", width: "100%" }}>{children}</div>
      </Provider>
    </QueryClientProvider>
  );
}
