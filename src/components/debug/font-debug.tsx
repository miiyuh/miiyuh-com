// Simple test component to verify font loading
'use client'

export default function FontTest() {
  if (typeof window === 'undefined') return null;
  
  const bodyStyle = window.getComputedStyle(document.body);
  const rootStyle = window.getComputedStyle(document.documentElement);
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      padding: '10px', 
      fontSize: '11px',
      zIndex: 9999,
      fontFamily: 'monospace',
      maxWidth: '300px',
      wordBreak: 'break-all'
    }}>
      <div><strong>Font Debug:</strong></div>
      <div>Body font: {bodyStyle.fontFamily}</div>
      <div>--font-noto-serif: {rootStyle.getPropertyValue('--font-noto-serif') || 'NOT FOUND'}</div>
      <div>--font-noto-sans: {rootStyle.getPropertyValue('--font-noto-sans') || 'NOT FOUND'}</div>
      <div>--font-noto-mono: {rootStyle.getPropertyValue('--font-noto-mono') || 'NOT FOUND'}</div>
      <div>--font-noto-color-emoji: {rootStyle.getPropertyValue('--font-noto-color-emoji') || 'NOT FOUND'}</div>
    </div>
  )
}
