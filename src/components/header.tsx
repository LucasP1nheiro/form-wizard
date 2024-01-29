import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="fixed bg-background border-b border-secondary w-screen top-0 py-4 text-primary flex items-center">
      <nav className="w-full">
        <ul className="flex w-4/5 mx-auto items-center justify-between">
          <li>
            <Button asChild size={'icon'} variant={'ghost'} className="p-1">
              <Link href="/">
                <Image
                  src={logo.src}
                  alt="Logo image"
                  width={50}
                  height={50}
                  priority
                  quality={100}
                />
              </Link>
            </Button>
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
