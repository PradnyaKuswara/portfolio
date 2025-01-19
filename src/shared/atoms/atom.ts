import { atom } from "recoil";

export const GlobalLoadingAtom = atom({
  key: "GlobalLoadingAtom",
  default: false,
});

export const ConfirmationModalAtom = atom({
  key: 'ConfirmationModalStateAtom',
  default: {
    isOpen: false,
    onConfirm: null as (() => void) | null,
  },
});