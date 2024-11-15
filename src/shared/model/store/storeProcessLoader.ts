import { create } from "zustand";



export type TProcessLoader = {
  visible: boolean;
  step: number;
  status: string;
  setVisible: (state: { visible: boolean; step: number } | boolean) => void;
  setStatus: (state: string) => void;
  handlerCancel?: any;
};

export const useProcessLoader = create<TProcessLoader>((set) => ({
  visible: false,
  step: 1,
  status: "Загрузка",

  setVisible(state) {
    if (typeof state !== "boolean") {
      set({ visible: state.visible, step: state.step });
    }

    set({ visible: !!state });
  },
  setStatus(state) {
    set({ status: state });
  },
}));
