import create from 'zustand'

interface AuthorState {
  isSignUpActive: boolean
  isHover: boolean
  isPress: boolean
}

interface AuthorActions {
  setSignUpActive: (value: boolean) => void
  setIsHover: (value: boolean) => void
  setIsPress: (value: boolean) => void
  handleSignupClick: () => void
  handleLoginClick: () => void
}

const useAuthorStore = create<AuthorState & { actions: AuthorActions }>(
  (set) => ({
    isSignUpActive: false,
    isHover: false,
    isPress: false,

    actions: {
      setSignUpActive: (value) => set({ isSignUpActive: value }),
      setIsHover: (value) => set({ isHover: value }),
      setIsPress: (value) => set({ isPress: value }),
      handleSignupClick: () => set({ isSignUpActive: true }),
      handleLoginClick: () => set({ isSignUpActive: false }),
    },
  }),
)

export const useIsSignUpActive = () =>
  useAuthorStore((state) => state.isSignUpActive)
export const useIsHover = () => useAuthorStore((state) => state.isHover)
export const useIsPress = () => useAuthorStore((state) => state.isPress)

export const useAuthorActions = () => useAuthorStore((state) => state.actions)
