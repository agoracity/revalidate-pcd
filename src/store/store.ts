import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PCDState {
  isLoading: boolean;
  validatedTickets: { [key: string]: boolean };
  isHydrated: boolean;
  setIsHydrated: (hydrated: boolean) => void;
  setLoading: (loading: boolean) => void;
  validateTicket: (ticketId: string) => void;
}

const usePCDStore = create<PCDState>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        validatedTickets: {},
        isHydrated: false,
        setIsHydrated: (hydrated) => set({ isHydrated: hydrated }),
        setLoading: (loading) => set({ isLoading: loading }),
        validateTicket: (ticketId) => set((state) => ({
          validatedTickets: {
            ...state.validatedTickets,
            [ticketId]: true,
          },
        })),
      }),
      { name: 'PCDStore' },
    ),
  ),
);
export default usePCDStore