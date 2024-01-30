'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import supabase from '../../../supabase'
import { Boxes } from '@/components/ui/background-boxes'

const emailSchema = z.object({
  email: z.string().email({
    message: 'This email is not valid.',
  }),
})

type EmailSchema = z.infer<typeof emailSchema>

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })

  const handleLogin = async ({ email }: EmailSchema) => {
    if (!errors.email) {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      })

      if (error) {
        console.error(error)
      } else {
        console.log(data)
      }
    }
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
            <span className="font-bold">Form Builder</span>
          </Link>
        </Button>
        <div className="w-full flex flex-col items-center justify-center gap-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to sign up your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-8 w-full"
          >
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                required
                type="email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-md text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-emerald-600 border border-emerald-200 w-full"
            >
              Sing Up
            </Button>
          </form>
        </div>

        <p>
          Already have an account?{' '}
          <Link href="sign-in">
            <strong>Sign In</strong>
          </Link>
        </p>
      </div>
    </main>
  )
}
