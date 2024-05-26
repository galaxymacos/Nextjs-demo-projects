import { create } from "zustand";

type OpenAccountState = {
    id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

/**
 * Manage the open state of the modal to modify an existing account.
 */
export const useOpenAccount = create<OpenAccountState>((set) => ({
    id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
