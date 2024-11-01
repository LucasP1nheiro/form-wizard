'use client'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import supabase from '@/lib/supabase-browser'
import { useState } from 'react'
import { AuthError } from '@supabase/supabase-js'

const emailSchema = z.object({
  email: z.string().email({
    message: 'This email is not valid.',
  }),
  password: z.string().min(8, 'The password has to be at least 8 characters.'),
})

type EmailSchema = z.infer<typeof emailSchema>

export function SignInForm() {
  const [loginError, setLoginError] = useState<AuthError | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })

  const handleLogin = async ({ email, password }: EmailSchema) => {
    if (!errors.email && !errors.password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (data && !error) {
        location.reload()
      }

      setLoginError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 w-full">
      <div className="space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email@example.com"
          required
          type="email"
          {...register('email')}
          className={cn({
            'ring-red-500 ring-2 focus-visible:ring-red-500': errors.email,
          })}
        />
        {errors.email && (
          <p className="text-md text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center gap-2">
          <Input
            id="password"
            placeholder="**********"
            required
            type="password"
            {...register('password')}
            className={cn({
              'ring-red-500 ring-2 focus-visible:ring-red-500': errors.password,
            })}
          />
        </div>
        {errors.password && (
          <p className="text-md text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-emerald-600 border border-emerald-200 w-full"
      >
        Sign In
      </Button>
      {loginError && (
        <p className="text-md text-red-500">{loginError.message}</p>
      )}
    </form>
  )
}
