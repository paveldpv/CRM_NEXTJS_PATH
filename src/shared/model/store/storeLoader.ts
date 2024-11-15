import { create } from "zustand";

export type TLoader = {
  visible: boolean;
  setVisibleLoader: (state: boolean) => void;
  text: string;
  setTextLoader: (value: string) => void;
};

export const useLoader = create<TLoader>((set) => ({
  visible: false,
  text: "Загрузка",
  setVisibleLoader: (state) => set({ visible: state }),
  setTextLoader: (value) => {
    console.log("🚀 ~ useLoader ~ value:", value)
    console.log();
    
    set({ text: value });
  },
}));
