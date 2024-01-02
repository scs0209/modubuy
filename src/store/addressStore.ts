import { ChangeEvent } from 'react'
import { create } from 'zustand'

// State 인터페이스 정의
interface State {
  address: string
  detailAddress: string
}

// Actions 인터페이스 정의
interface Actions {
  setAddress: (address: string) => void
  setDetailAddress: (detailAddress: string) => void
  handleDetailAddressChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const useAddressStore = create<State & { actions: Actions }>((set) => ({
  address: '',
  detailAddress: '',
  actions: {
    setAddress: (address: string) => set({ address }),
    setDetailAddress: (detailAddress: string) => set({ detailAddress }),
    handleDetailAddressChange: (event: ChangeEvent<HTMLInputElement>) => {
      set({ detailAddress: event.target.value })
    },
  },
}))

// State 가져오는 hook
export const useAddress = () => useAddressStore((state) => state.address)
export const useDetailAddress = () =>
  useAddressStore((state) => state.detailAddress)

// Actions 가져오는 hook
export const useAddressActions = () => useAddressStore((state) => state.actions)
