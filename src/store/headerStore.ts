import { create } from 'zustand'

// State 인터페이스 정의
interface State {
  currentTitle: string
}

// Actions 인터페이스 정의
interface Actions {
  setCurrentTitle: (title: string) => void
}

export const useHeaderStore = create<State & { actions: Actions }>((set) => ({
  currentTitle: 'Dashboard',
  actions: {
    setCurrentTitle: (title: string) => set({ currentTitle: title }),
  },
}))

// State 가져오는 hook
export const useCurrentTitle = () =>
  useHeaderStore((state) => state.currentTitle)

// Actions 가져오는 hook
export const useTitleActions = () => useHeaderStore((state) => state.actions)
