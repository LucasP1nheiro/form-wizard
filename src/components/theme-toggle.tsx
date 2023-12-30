'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-fit w-fit p-2 hover:bg-secondary/10"
    >
      <Sun
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        size={24}
        color="#000"
      />
      <Moon
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        size={24}
        color="#fff"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
