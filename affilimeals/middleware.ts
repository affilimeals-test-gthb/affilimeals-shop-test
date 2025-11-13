import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(req:NextRequest){
  const url = req.nextUrl
  if(url.pathname.startsWith('/a/')){
    const code = url.pathname.split('/').pop()
    const res = NextResponse.redirect(new URL('/', req.url))
    if(code) res.cookies.set('affiliate', String(code), { maxAge:60*60*24*30, path:'/' })
    return res
  }
  return NextResponse.next()
}
export const config = { matcher:['/a/:path*'] }
