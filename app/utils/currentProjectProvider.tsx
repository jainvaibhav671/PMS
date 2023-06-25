import { createContext, useContext, useState } from "react";

interface Store {
  currProj: string;
  setProj: (proj: string) => void;
}

const useStore = (): Store => {
  const [currProj, setCurrProj] = useState("");

  return {
    currProj: currProj,
    setProj: (proj: string) => setCurrProj(proj),
  };
};

export const StoreContext = createContext<Store | null>(null);

export function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>
  );
}

export const useCurrentProject = () => useContext(StoreContext)?.currProj;

export const useSetCurrentProject = (proj: string) =>
  useContext(StoreContext)?.setProj(proj);
