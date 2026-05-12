import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lrpivntxdezuaatprkyj.supabase.co'
const supabaseKey = 'sb_publishable_QXYJfyXxUJz1LERhUtW9_g_Y4WBEQEA'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
