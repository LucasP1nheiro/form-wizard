import React from 'react'
import Form from '../form'
import createClient from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

interface PageProps {
  params: {
    id: number
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }
  return (
    <main className="w-screen min-h-screen bg-background p-4">
      <Form formId={id} userId={user.id} />
    </main>
  )
}

export default Page
