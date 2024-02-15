import type { Metadata } from 'next'
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import icon from '@/app/favicon.ico'
import Footer from '@/components/landing-page/footer'

const spaceGrotesk = SpaceGrotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Form Wizard',
  description: 'Form builder application.',
}

export const revalidate = 0

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href={icon.src} />
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
