import { create } from "zustand";

type NewAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Manage the open state of the new account modal.
 */
export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
