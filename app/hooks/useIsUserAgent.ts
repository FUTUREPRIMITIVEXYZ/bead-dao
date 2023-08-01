'use client'
import { useEffect, useState } from 'react'

// returns true if the userAgent string contains the searchString
export function useIsUserAgent(searchString: string): boolean {
    const [isMatch, setIsMatch] = useState(false)

    useEffect(() => {
        const userAgent = global.navigator.userAgent
        setIsMatch(userAgent.includes(searchString))
    }, [searchString])

    return isMatch
}