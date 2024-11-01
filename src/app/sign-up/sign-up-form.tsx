'use client'

import supabase from '@/lib/supabase-browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import console from 'console'

const emailSchema = z
  .object({
    email: z.string().email({
      message: 'This email is not valid.',
    }),
    password: z
      .string()
      .min(8, 'The password has to be at least 8 characters.'),
    confirmPassword: z
      .string()
      .min(8, 'The password has to be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type EmailSchema = z.infer<typeof emailSchema>

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  })

  const handleSignUp = async ({ email, password }: EmailSchema) => {
    if (!errors.confirmPassword && !errors.email && !errors.password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      const emailAlreadyExists =
        data.user && data.user.identities && data.user.identities.length === 0

      if (emailAlreadyExists) {
        toast.error('Email already exists.')
        return
      }

      if (data && !error) {
        toast.info(
          'An email was sent to you. Check your inbox to finish the registration.',
        )
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-8 w-full">
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
      <div className="space-y-3">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="flex items-center gap-2">
          <Input
            id="confirm-password"
            placeholder="**********"
            required
            type="password"
            {...register('confirmPassword')}
            className={cn({
              'ring-red-500 ring-2 focus-visible:ring-red-500':
                errors.confirmPassword,
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-md text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-emerald-600 border border-emerald-200 w-full"
      >
        Sign Up
      </Button>
    </form>
  )
}
