import { Button } from '@/components/ui/button'
import Link from 'next/link'

import Forms from '@/components/forms'

export default function Page() {
  return (
    <main className="bg-background w-screen min-h-screen flex flex-col p-4 gap-12 py-32">
      <div className="lg:w-4/5 mx-auto flex items-center gap-2 justify-end w-full">
        <Button
          asChild
          className="border border-emerald-200 bg-emerald-600 w-full lg:w-fit"
        >
          <Link href="/builder" className="flex items-center gap-2">
            <p>New form</p>
          </Link>
        </Button>
      </div>
      <Forms />
    </main>
  )
}
