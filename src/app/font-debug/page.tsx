'use client'

import { useEffect, useState } from 'react'

export default function FontDebugPage() {
  const [fontInfo, setFontInfo] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body
      const rootStyle = getComputedStyle(document.documentElement)
      const bodyStyle = getComputedStyle(body)
      
      // Test paragraph element
      const testP = document.createElement('p')
      testP.className = 'font-serif'
      testP.style.visibility = 'hidden'
      testP.textContent = 'Test'
      body.appendChild(testP)
      const pStyle = getComputedStyle(testP)
      
      setFontInfo({
        bodyFont: bodyStyle.fontFamily,
        notoSerif: rootStyle.getPropertyValue('--font-noto-serif'),
        notoSans: rootStyle.getPropertyValue('--font-noto-sans'),
        notoMono: rootStyle.getPropertyValue('--font-noto-mono'),
        notoEmoji: rootStyle.getPropertyValue('--font-noto-color-emoji'),
        pFont: pStyle.fontFamily,
        allVars: Object.fromEntries(
          Array.from(document.styleSheets)
            .flatMap(sheet => {
              try {
                return Array.from(sheet.cssRules)
              } catch {
                return []
              }
            })
            .filter(rule => rule instanceof CSSStyleRule)
            .map(rule => rule.style)
            .filter(style => style.length > 0)
            .flatMap(style => Array.from(style))
            .filter(prop => prop.startsWith('--font'))
            .map(prop => [prop, rootStyle.getPropertyValue(prop)])
        )
      })
      
      body.removeChild(testP)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-[#FAF3E0] p-8">
      <h1 className="text-3xl font-bold mb-6">Font Debug Information</h1>
      
      <div className="space-y-4 font-mono text-sm">
        <div>
          <strong>Body font-family:</strong>
          <pre className="bg-gray-800 p-2 mt-1 rounded">{fontInfo.bodyFont}</pre>
        </div>
        
        <div>
          <strong>Test paragraph (.font-serif) font-family:</strong>
          <pre className="bg-gray-800 p-2 mt-1 rounded">{fontInfo.pFont}</pre>
        </div>
        
        <div>
          <strong>CSS Variables:</strong>
          <pre className="bg-gray-800 p-2 mt-1 rounded">
            --font-noto-serif: {fontInfo.notoSerif || 'NOT FOUND'}{'\n'}
            --font-noto-sans: {fontInfo.notoSans || 'NOT FOUND'}{'\n'}
            --font-noto-mono: {fontInfo.notoMono || 'NOT FOUND'}{'\n'}
            --font-noto-color-emoji: {fontInfo.notoEmoji || 'NOT FOUND'}
          </pre>
        </div>
        
        <div>
          <strong>All font variables found:</strong>
          <pre className="bg-gray-800 p-2 mt-1 rounded">
            {JSON.stringify(fontInfo.allVars, null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl font-bold">Live Font Tests:</h2>
        
        <div className="border border-gray-600 p-4">
          <h3 className="font-bold">Default text (should be Inter): </h3>
          <p>This is default text with emoji 🍁</p>
        </div>
        
        <div className="border border-gray-600 p-4">
          <h3 className="font-bold">Paragraph tag (should be Noto Serif): </h3>
          <p>This paragraph should use Noto Serif with emoji 🍁</p>
        </div>
        
        <div className="border border-gray-600 p-4">
          <h3 className="font-bold">Explicit .font-serif (should be Noto Serif): </h3>
          <div className="font-serif">This uses .font-serif class with emoji 🍁</div>
        </div>
        
        <div className="border border-gray-600 p-4">
          <h3 className="font-bold">Explicit .font-sans (should be Inter): </h3>
          <div className="font-sans">This uses .font-sans class with emoji 🍁</div>
        </div>
      </div>
    </main>
  )
}
