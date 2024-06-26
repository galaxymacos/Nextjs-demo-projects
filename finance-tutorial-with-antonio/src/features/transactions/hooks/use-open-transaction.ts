import { create } from "zustand";

type OpenTransactionState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

/**
 * Open and close the modal that modifies an existing transaction.
 */
export const useOpenTransaction = create<OpenTransactionState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
