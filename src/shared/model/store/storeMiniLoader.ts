import { create } from "zustand";

export type TMiniLoader = {
  visible: boolean;
  setVisibleLoader: (state: boolean) => void;
 
};

export const useMiniLoader = create<TMiniLoader>((set) => ({
  visible: true,  
  setVisibleLoader: (state) => set({ visible: state }),
 
}));
