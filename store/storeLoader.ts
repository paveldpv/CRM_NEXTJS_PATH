import { create } from "zustand";

export type TLoader = {
  visible: boolean;
  setVisibleLoader: (state: boolean) => void;
  text: string;
  setText: (value: string) => void;
};

export const useLoader = create<TLoader>((set) => ({
  visible: true,
  text: "Загрузка",
  setVisibleLoader: (state) => set({ visible: state }),
  setText: (value) => {
    set({ text: value });
  },
}));
