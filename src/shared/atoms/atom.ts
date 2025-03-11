import { atom } from "recoil";
import moment from "moment";
import CertificateNamespace from "../../@types/certificate";
import ProjectCategoryNamespace from "../../@types/project-category";
import ProjectNamespace from "../../@types/project";

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

export const ModalInputCertificateAtom = atom<{ isOpen: boolean; isEdit: boolean; data: CertificateNamespace.Certificate | null }>({
  key: 'ModalInputCertificate',
  default: {
    isOpen: false,
    isEdit: false,
    data: null,
  },
});

export const ModalInputProjectCategoryAtom = atom<{ isOpen: boolean; isEdit: boolean; data: ProjectCategoryNamespace.ProjectCategory | null }>({
  key: 'ModalInputProjectCategoryAtom',
  default: {
    isOpen: false,
    isEdit: false,
    data: null,
  },
});

export const ModalInputProjectAtom = atom<{ isOpen: boolean; isEdit: boolean; data: ProjectNamespace.Project | null }>({
  key: 'ModalInputProjectAtom',
  default: {
    isOpen: false,
    isEdit: false,
    data: null,
  },
});