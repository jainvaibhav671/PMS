import { createContext, useContext, useState } from "react";

interface Store {
  getProj: () => string;
  setProj: (proj: string) => void;
}

const useStore = (): Store => {
  const [currProj, setCurrProj] = useState("");

  return {
    getProj: () => currProj,
    setProj: (proj: string) => {
      console.log("Setting", proj);
      setCurrProj(proj);
    },
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

export const useCurrentProject = () => useContext(StoreContext)?.getProj();

export const useSetCurrentProject = (proj: string) =>
  useContext(StoreContext)?.setProj(proj);
