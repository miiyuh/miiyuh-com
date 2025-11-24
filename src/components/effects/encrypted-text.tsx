'use client'

import { useEffect, useState } from 'react'

interface EncryptedTextProps {
    text: string
    className?: string
    speed?: number
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
    children?: React.ReactNode
}

export function EncryptedText({
    text,
    className = '',
    speed = 20,
    as: Component = 'span',
    children
}: EncryptedTextProps) {
    const [displayText, setDisplayText] = useState('')
    // Removed unused isDecrypting state

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

    useEffect(() => {
        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' '
                        if (index < iteration) {
                            return text[index]
                        }
                        return characters[Math.floor(Math.random() * characters.length)]
                    })
                    .join('')
            )

            if (iteration >= text.length) {
                clearInterval(interval)
            }

            iteration += 1
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed])

    return (
        <Component className={className}>
            {children ? (
                <>
                    {displayText}
                    {children}
                </>
            ) : (
                displayText
            )}
        </Component>
    )
}
