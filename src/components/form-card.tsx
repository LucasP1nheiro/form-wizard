import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'

export function FormCard({ form }: { form: any }) {
  return (
    <Card className="border border-border bg-background">
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
  )
}
