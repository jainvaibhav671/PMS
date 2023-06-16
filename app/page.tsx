import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./components/Dashboard/Dashboard";

export default function Home() {
  return (
    <main style={{height: "100%", width: "100%" }}>
        <Dashboard />
        <ReactQueryDevtools />
    </main>
  )
}
