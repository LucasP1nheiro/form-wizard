import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

import { UserAccountNav } from './user-account-nav'

const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="fixed bg-background/10 backdrop-blur-2xl border-b border-secondary w-screen top-0 py-4 text-primary flex items-center z-50">
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

          <div className="flex items-center gap-2">
            {user ? (
              <UserAccountNav userEmail={user.email} />
            ) : (
              <li>
                <Button
                  asChild
                  className="border border-emerald-200 bg-emerald-600 h-5 py-3"
                >
                  <Link href="/sign-in">
                    <p>Sign In</p>
                  </Link>
                </Button>
              </li>
            )}

            <li>
              <ThemeToggle />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Header
