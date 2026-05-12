import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://lrpivntxdezuaatprkyj.supabase.co'
const supabaseKey = 'sb_publishable_QXYJfyXxUJz1LERhUtW9_g_Y4WBEQEA'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const civil = body.civil?.trim()
    const password = body.password?.trim()

    if (!civil || !password) {
      return NextResponse.json(
        { error: 'Please enter the Civil ID and password' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('civil', civil)
      .eq('password', password)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid Civil ID or password' },
        { status: 401 }
      )
    }

    return NextResponse.json({ student: data })
  } catch (error) {
    console.error('API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
