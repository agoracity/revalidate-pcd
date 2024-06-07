import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  validatedTickets: { [key: string]: boolean };
  validateTicket: (ticketId: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  validatedTickets: {},
  validateTicket: (ticketId) => set((state) => ({
    validatedTickets: {
      ...state.validatedTickets,
      [ticketId]: true,
    },
  })),
}));
