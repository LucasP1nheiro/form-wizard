import { Json } from '@/db/schema'
import supabase from '@/lib/supabase-browser'

interface CreateReplyRequest {
  answers: Json
  formId: number
}

export async function createReply({ answers, formId }: CreateReplyRequest) {
  await supabase.from('replys').insert({ answers, form_id: formId })
}
