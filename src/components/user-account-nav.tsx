'use client'

import supabase from '@/lib/supabase-browser'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { LogOut, UserRound } from 'lucide-react'
import { Profiler } from 'react'

export function UserAccountNav({
  userEmail,
}: {
  userEmail: string | undefined
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-foreground rounded-full size-6 p-2 text-accent">
          <AvatarFallback>
            {userEmail?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border bg-muted p-4 rounded-md border-border px-8"
        align="end"
      >
        <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-muted-forefround" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <UserRound />
          <p>Profile</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-muted-forefround" />
        <DropdownMenuItem
          onSelect={async () => {
            await supabase.auth.signOut()
            location.reload()
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut />
          <p>Sign Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
