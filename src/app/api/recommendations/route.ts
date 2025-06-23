// src/app/api/recommendations/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies as getCookies } from 'next/headers'

export async function GET() {
    const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get: async (name: string) => {
        const cookieStore = await getCookies(); 
        return cookieStore.get(name)?.value;
      }
    }
  }
);



  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const { data } = await supabase
      .from('books')
      .select('id')
      .not('upload_url', 'is', null)
      .order('created_at', { ascending: false })
      .limit(12)

    return NextResponse.json(data)
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/recommend`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id }),
    }
  )

  const recommendations = await res.json()
  return NextResponse.json(recommendations)
}
