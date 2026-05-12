import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = 'https://lrpivntxdezuaatprkyj.supabase.co'
const supabaseKey = 'sb_publishable_QXYJfyXxUJz1LERhUtW9_g_Y4WBEQEA'

const supabase = createClient(supabaseUrl, supabaseKey)
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
