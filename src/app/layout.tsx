import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import icon from '@/app/favicon.ico'
import createClient from '@/lib/supabase-server'
import { ReactQueryClienProvider } from '@/components/react-query-client-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Form Wizard',
  description: 'Form builder application.',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <link rel="icon" href={icon.src} />
      <body className={inter.className}>
        <ReactQueryClienProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header user={user} />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryClienProvider>
      </body>
    </html>
  )
}
