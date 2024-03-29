import { Json } from '@/db/schema'
import supabase from '@/lib/supabase-browser'

interface GetFormsRequest {
  userId: string
}

interface CreateFormRequest {
  name: string
  description: string
  fields: Json
}

interface DeleteFormRequest {
  formId: number
}

interface GetFormByIdRequest {
  formId: number
  userId: string
}

export async function getForms({ userId }: GetFormsRequest) {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .order('created_at', { ascending: false })
    .match({ user_id: userId })

  return forms
}

export async function createForm({
  name,
  description,
  fields,
}: CreateFormRequest) {
  await supabase.from('forms').insert({ name, description, fields })
}

export async function deleteForm({ formId }: DeleteFormRequest) {
  await supabase.from('forms').delete().eq('id', formId)
}

export async function getFormById({ formId, userId }: GetFormByIdRequest) {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .match({ id: formId, user_id: userId })
    .limit(1)
    .single()

  return forms
}
