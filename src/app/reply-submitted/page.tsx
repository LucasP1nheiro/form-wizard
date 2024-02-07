import React from 'react'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Boxes } from '@/components/ui/background-boxes'

const Page = () => {
  return (
    // <main className="w-screeen h-screen flex items-center justify-center flex-col gap-4 bg-background">
    //   <Check size={60} className="stroke-primary" />
    //   <h1 className="text-3xl font-bold">Thank You</h1>
    //   <p>Your response has been successfully submitted!</p>
    // </main>
    <main className="w-screen h-screen max-h-screen overflow-hidden flex items-center justify-center relative p-4">
      <div className="absolute inset-0 w-full h-full bg-background/90 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="flex items-center flex-col gap-8 bg-background/20 backdrop-blur-lg w-full 2xl:w-1/4 sm:w-2/3 md:w-1/2 p-4 border rounded-md border-border z-50  shadow-lg">
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
        <div className="w-full flex flex-col items-center justify-center">
          <div className="space-y-8 text-center">
            <h1 className="text-3xl font-bold">Thank You</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your response has been{' '}
              <strong className="text-primary">successfully</strong> submitted!
            </p>
          </div>
        </div>

        {/* <p>
          Don&apos;t have an account?{' '}
          <Link href="sign-up">
            <strong>Sign Up</strong>
          </Link>
        </p> */}
        <div className="flex items-center gap-2">
          <Button>Home</Button>
          <Button variant={'outline'}>Sign in</Button>
        </div>
      </div>
    </main>
  )
}

export default Page
