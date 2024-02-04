import { Json } from '@/db/schema'
import supabase from '@/lib/supabase-browser'

interface CreateFormRequest {
  name: string
  description: string
  fields: Json
}

export async function getForms() {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .order('created_at', { ascending: false })

  return forms
}

export async function createForm({
  name,
  description,
  fields,
}: CreateFormRequest) {
  await supabase.from('forms').insert({ name, description, fields })
}

export async function getFormByShareUrl({ shareUrl }: { shareUrl: string }) {
  const { data } = await supabase
    .from('forms')
    .select()
    .match({ share_url: shareUrl })

  return data
}
