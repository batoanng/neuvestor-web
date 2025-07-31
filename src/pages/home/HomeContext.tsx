import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

export type HomeContextState = {
  openDrawer: boolean;
};

export const HomeContext = createContext<[HomeContextState, Dispatch<SetStateAction<HomeContextState>>] | null>(null);

export const HomeContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const state = useState<HomeContextState>({ openDrawer: false });

  return <HomeContext.Provider value={state}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context) return context;

  throw new Error('No context found, please ensure you are using this hook from inside a HomeContextProvider');
};
