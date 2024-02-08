import { Json } from '@/db/schema'
import supabase from '@/lib/supabase-browser'

interface CreateReplyRequest {
  answers: Json
  formId: number
}

interface GetReplysByFromIdRequest {
  formId: number
}

export async function createReply({ answers, formId }: CreateReplyRequest) {
  await supabase.from('replys').insert({ answers, form_id: formId })
}

export async function getReplysByFormId({ formId }: GetReplysByFromIdRequest) {
  const { data: replys } = await supabase
    .from('replys')
    .select()
    .match({ form_id: formId })

  return replys
}
