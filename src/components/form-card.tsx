import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Database } from '@/db/schema'
import DeleteFormAlertDialog from './delete-form-alert-dialog'
import { ShareForm } from './share-form'

type Form = Database['public']['Tables']['forms']['Row']

export function FormCard({ form }: { form: Form }) {
  return (
    <Card className="border border-border bg-background min-h-full max-h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="max-w-4/5 whitespace-nowrap truncate">
          {form.name}
        </CardTitle>
        <div className="flex items-center gap-2">
          <ShareForm shareUrl={form.share_url} />
          <DeleteFormAlertDialog formId={form.id} />
        </div>
      </CardHeader>
      <CardContent className="h-72 overflow-hidden whitespace-break-spaces overflow-y-hidden">
        {form.description}
      </CardContent>
      <CardFooter className="mt-2">
        <Button
          className="w-full bg-accent-foreground hover:bg-accent-foreground/75 text-background transition-all duration-300"
          asChild
          variant="default"
        >
          <Link href={`/forms/${form.id}`}>
            <p>See More</p>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
