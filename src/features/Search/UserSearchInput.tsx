'use client'

import { useEffect, useState } from 'react'
import s from './UserSearchInput.module.scss'

type Props = {
    onSearch: (value: string) => void
    placeholder?: string
    delay?: number
}

export const UserSearchInput = ({ onSearch, placeholder, delay = 800 }: Props) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay, onSearch])

    return (
        <input
            type="text"
            className={s.searchInput}
            placeholder={placeholder || 'Search user...'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}
