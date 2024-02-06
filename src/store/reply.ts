import { ReplyFields } from '@/types/reply'
import { create } from 'zustand'

type ReplyFieldsStore = {
  replyFields: ReplyFields[]
  setReplyFields: (replyField: ReplyFields[]) => void
}

export const useReplyFieldsStore = create<ReplyFieldsStore>((set) => ({
  replyFields: [],
  setReplyFields: (replyFields) => set({ replyFields }),
}))
