import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Home() {
  return (
    <main>
      <div>
        Welcome
        <ReactQueryDevtools />
      </div>
    </main>
  )
}
