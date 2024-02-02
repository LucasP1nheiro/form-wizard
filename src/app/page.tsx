import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import supabase from '@/lib/supabase-browser'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import Loading from './forms-loading'

export default async function Home() {
  const { data: forms } = await supabase
    .from('forms')
    .select()
    .order('created_at', { ascending: false })

  return (
    <main className="bg-background w-screen min-h-screen flex flex-col p-4 gap-8 py-32">
      <div className="w-4/5 mx-auto flex items-center gap-2 justify-end">
        <Button asChild className="border border-emerald-200 bg-emerald-600 ">
          <Link href="/builder" className="flex items-center gap-2">
            <Plus size={18} />
            <p>New form</p>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="w-4/5 mx-auto grid grid-cols-4 gap-4">
          {forms?.map((form) => (
            <Card key={form.id} className="border border-border bg-background">
              <CardHeader>
                <CardTitle>{form.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{form.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-accent-foreground hover:bg-accent-foreground/75 text-background transition-all duration-300"
                  asChild
                  variant="default"
                >
                  <Link href={`/forms/${form.share_url}}`}>
                    <p>See More</p>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Suspense>
    </main>
  )
}
