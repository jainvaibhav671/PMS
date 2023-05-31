import Image from 'next/image'
import TaskList from './components/TaskLists';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function Home() {
  const tasks = [1, 2, 3, 4];
  return (
    <main>
      <Sidebar lists={tasks} />
      <div id="app">
        <Header />
        <TaskList tasks={tasks} />
      </div>
    </main>
  )
}
