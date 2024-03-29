import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import { Boxes } from '@/components/ui/background-boxes'
import { SignInForm } from './sign-in-form'
import createClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <main className="w-screen h-screen max-h-screen overflow-hidden flex items-center justify-center relative">
      <div className="absolute inset-0 w-full h-full bg-background/90 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="flex items-center flex-col gap-8 bg-background/20 backdrop-blur-lg w-full 2xl:w-1/4 lg:w-1/2 p-4 border rounded-md border-border z-50  shadow-lg">
        <Button asChild variant={'ghost'} className="p-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo.src}
              alt={'Logo image'}
              width={36}
              height={36}
              priority
              quality={100}
            />
            <span className="font-bold">Form Wizard</span>
          </Link>
        </Button>
        <div className="w-full flex flex-col items-center justify-center gap-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to sign in to your account
            </p>
          </div>
        </div>

        <SignInForm />

        <p>
          Don&apos;t have an account?{' '}
          <Link href="sign-up">
            <strong>Sign Up</strong>
          </Link>
        </p>
      </div>
    </main>
  )
}
