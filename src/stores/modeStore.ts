import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BearState {
  isOptimisticMode?: boolean;
  setMode: (isOptimisticMode: boolean) => void
}

export const useModeStore = create<BearState>()(
  persist(
    (set) => ({
      isOptimisticMode: true,
      setMode: (isOptimisticMode) => set(() => ({ isOptimisticMode })),
    }),
    {
      name: 'mode-storage',
    },
  ),
)