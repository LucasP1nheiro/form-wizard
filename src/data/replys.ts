import { Json } from '@/db/schema'
import supabase from '@/lib/supabase-browser'

interface CreateReplyRequest {
  answers: Json
  formId: number
  name: string
  email: string
}

interface GetReplysByFromIdRequest {
  formId: number
}

export async function createReply({
  answers,
  formId,
  name,
  email,
}: CreateReplyRequest) {
  await supabase
    .from('replys')
    .insert({ answers, form_id: formId, name, email })
}

export async function getReplysByFormId({ formId }: GetReplysByFromIdRequest) {
  const { data: replys } = await supabase
    .from('replys')
    .select()
    .match({ form_id: formId })
    .order('created_at', { ascending: false })

  return replys
}
