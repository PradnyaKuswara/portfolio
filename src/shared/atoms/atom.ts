import { atom } from "recoil";
import moment from "moment";
import CertificateNamespace from "../../@types/certificate";

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

export const UserAtom = atom({
  key: 'UserAtom',
  default: null,
})

export const GlobalFilterAtom = atom({
  key: 'FiltersStateAtom',
  default: {
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
    startDate: moment().subtract(3, 'day'),
    endDate: moment().add(3, 'day'),
  },
});

export const ModalInputCertificateAtom = atom<{ isOpen: boolean; data: CertificateNamespace.Certificate | null }>({
  key: 'ModalInputCertificate',
  default: {
    isOpen: false,
    data: null,
  },
});