import { ComponentPropsMap, ComponentProps } from '@/types/components'
import { create } from 'zustand'

type ComponentStore = {
  components: ComponentProps<keyof ComponentPropsMap>[]
  setComponents: (components: ComponentProps<keyof ComponentPropsMap>[]) => void
}

export const useComponentStore = create<ComponentStore>((set) => ({
  components: [],
  setComponents: (components) => set({ components }),
}))
