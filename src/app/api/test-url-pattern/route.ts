import { NextResponse } from 'next/server'

export async function GET() {
  const testUrl = 'https://tavt1iz2ukisuwtc.public.blob.vercel-storage.com/mikase.png'
  
  const tests = {
    originalPattern: testUrl.includes('blob.vercel-storage.com'),
    newPattern: testUrl.includes('.blob.vercel-storage.com'),
    url: testUrl,
    shouldRedirect: testUrl.includes('.blob.vercel-storage.com'),
  }
  
  console.log('🧪 URL Pattern Test:', tests)
  
  return NextResponse.json(tests)
}
