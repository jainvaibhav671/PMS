import { atom, useAtom, useSetAtom } from "jotai";

interface NavHistoryInterface {
  id: string;
  name: string;
}

export const CurrentProjectAtom = atom("");
export const ActiveTab = atom(0);
export const ActivePage = atom(0);
export const NavHistory = atom<NavHistoryInterface[]>([
  { name: "All Projects", id: "" },
]);

export const useJumpToProject = () => {
  const [history, setHistory] = useAtom(NavHistory);
  const [currentProject, setCurrentProject] = useAtom(CurrentProjectAtom);

  return (idx: number) => {
    const id = history[idx].id;
    if (currentProject === id) return;

    setHistory(history.slice(0, idx + 1));
    setCurrentProject(id);
  };
};

export const usePushProject = () => {
  const [history, setHistory] = useAtom(NavHistory);
  const setCurrentProject = useSetAtom(CurrentProjectAtom);

  return (proj: NavHistoryInterface) => {
    console.log(proj)
    setHistory([...history, proj]);
    setCurrentProject(proj.id);
  };
};

export const usePopProject = () => {
  const [history, setHistory] = useAtom(NavHistory);
  const setCurrentProject = useSetAtom(CurrentProjectAtom);

  return () => {
    if (history.length == 1) return;
    setHistory(history.slice(0, -1));
    setCurrentProject(history[history.length - 2].id);
  };
};
