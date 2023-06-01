import { link } from 'fs'
import Image from 'next/image'

export default function TaskList({ 
    tasks
}: {
    tasks: Array<React.ReactNode>
}) {

  tasks = tasks.map( (t: any, idx: number) => <li key={idx}>{t}</li>)

  return (
    <>
      <ul>
        {tasks}
      </ul>
    </>
  )
}
