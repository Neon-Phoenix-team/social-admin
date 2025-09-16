'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './Card.module.scss'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { Title } from '@/shared/ui/Title/Title'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'
import Close from '@/shared/assets/icons/components/Close'

export type CardTextType = {
  open: boolean
  title: string
  action: () => void
  children: ReactNode
  noBackground?: boolean
}

export const Card = ({ title, action, open, children, noBackground }: CardTextType) => {
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        action();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, action]);

  if (!open || !mounted) return null

  return createPortal(
    <div className={clsx(s.overlay, noBackground && s.noBackgroundOverlay)}>
      <div className={s.wrapper} ref={modalRef}>
        <div className={s.title}>
          <Title>{title}</Title>
          <Button onClick={action} variant={'text'} style={{ color: '#fff', padding: '0px 0px' }}>
            <Close />
          </Button>
        </div>
        <div className={s.textWrapper}>{children}</div>
      </div>
    </div>,
    document.body
  )
}