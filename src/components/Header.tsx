import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

const Header = () => {
  return (
    <header className="fixed bg-background border-b border-secondary w-screen top-0 h-[10%] text-primary flex items-center">
      <nav className="w-full">
        <ul className="flex w-4/5 mx-auto items-center justify-between">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
