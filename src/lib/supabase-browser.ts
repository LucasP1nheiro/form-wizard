import { Database } from '@/db/schema'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

const supabase = createPagesBrowserClient<Database>()

export default supabase
