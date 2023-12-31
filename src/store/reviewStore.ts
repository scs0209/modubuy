import { create } from 'zustand'

interface State {
  editing: Record<string, boolean>
}

// Define the actions
interface Actions {
  startEditing: (id: string) => void
  stopEditing: (id: string) => void
}

const useReviewStore = create<State & { actions: Actions }>((set) => ({
  // state
  editing: {},

  // actions
  actions: {
    startEditing: (id) =>
      set((state) => ({ editing: { ...state.editing, [id]: true } })),
    stopEditing: (id) =>
      set((state) => ({ editing: { ...state.editing, [id]: false } })),
  },
}))

export const useEditingState = () => useReviewStore((state) => state.editing)
export const useReviewActions = () => useReviewStore((state) => state.actions)

export default useReviewStore
