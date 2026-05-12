import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

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
      .from('تقييم الطالبات')
      .select('*')
      .eq('id', civil)
      .eq('كلمة المرور', password)
      .maybeSingle()

    if (error) {
      console.error('Supabase error:', error)

      return NextResponse.json(
        { error: 'Something went wrong while fetching the student data' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Civil ID or password is incorrect' },
        { status: 404 }
      )
    }

    return NextResponse.json({ student: data })
  } catch (error) {
    console.error('API error:', error)

    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}