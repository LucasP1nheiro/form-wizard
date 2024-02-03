import supabase from '@/lib/supabase-browser'

export async function getForms() {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .order('created_at', { ascending: false })

  return forms
}

export async function createForm({ name, description, fields }: any) {
  await supabase.from('forms').insert({ name, description, fields })
}
