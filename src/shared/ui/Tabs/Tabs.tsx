'use client'

import * as Tabs from '@radix-ui/react-tabs'
import React from 'react'
import styles from './Tabs.module.scss'

export type TabItem = {
  id: string
  label: string
  content?: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  value:string
  onValueChange?: (value: string) => void
  className?: string
}

export const TabsComponent = ({
  tabs,
  value,
  onValueChange,
  className,
}: TabsProps) => {
  return (
    <Tabs.Root
      className={`${styles.tabsRoot} ${className}`}
      value={value || tabs[0]?.id}
      onValueChange={onValueChange}
    >
      <Tabs.List className={styles.tabsList}>
        {tabs.map(tab => (
          <Tabs.Trigger
            key={tab.id}
            className={styles.tabsTrigger}
            value={tab.id}
            disabled={tab.disabled}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
