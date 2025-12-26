import { create } from "zustand";

export type TDataHelpInformer = {
  title?: string;
  listMessage?: string[];
};

export type THelpInformerWindow = {
  open: boolean;
  setOpen: (open: boolean, data?: TDataHelpInformer) => void;
} & TDataHelpInformer;

export const useHelInformer = create<THelpInformerWindow>((set) => ({
  open: false,
  setOpen: (open, data) => {
    set({ open: open, title: data?.title, listMessage: data?.listMessage });
  },
}));
