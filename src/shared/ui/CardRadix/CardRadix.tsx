'use client'

import { Title } from '@/shared/ui/Title/Title'
import * as Dialog from '@radix-ui/react-dialog'
import * as React from 'react'
import s from './CardRadix.module.scss'
import Close from '@/shared/assets/icons/components/Close'
import { Button } from '@/shared/ui/Button/Button'

export default function CardRadix({
  open,
  onOpenChange,
  children,
  title,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={s.DialogContent}>
          <div className={s.title}>
            <Title>{title}</Title>
            <Dialog.Close asChild>
              <Button variant={'text'}>
                <Close />
              </Button>
            </Dialog.Close>
          </div>
          <div className={s.textWrapper}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
