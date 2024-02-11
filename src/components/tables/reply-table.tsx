'use client'

import { Database } from '@/db/schema'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { formatDate } from 'date-fns'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

type Reply = Database['public']['Tables']['replys']['Row']

interface ReplyTableProps {
  replies: Reply[]
}

const ReplyTable = ({ replies }: ReplyTableProps) => {
  const pathname = usePathname()

  const pageRange = 2

  const totalPages = Math.ceil(replies.length / pageRange)

  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

  const shouldShowFistPage = currentPage > 9

  const shouldShowLastPage = replies.length - currentPage > 9

  return (
    <section className="w-full space-y-8">
      <div className="w-full p-4 border border-border rounded-md space-y-8">
        <Table>
          <TableCaption>A list of your recent replies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Created at</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {replies
              .slice((currentPage - 1) * pageRange, currentPage * pageRange)
              .map((reply) => (
                <TableRow key={reply.id}>
                  <TableCell className="font-medium">
                    {formatDate(reply.created_at, 'PPP')}
                  </TableCell>
                  <TableCell>{reply.name}</TableCell>
                  <TableCell>{reply.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant={'secondary'} asChild>
                      <Link href={`/replies/${reply.share_url}`}>See more</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname,
                query: { page: currentPage === 1 ? 1 : currentPage - 1 },
              }}
              scroll={false}
            />
          </PaginationItem>
          {shouldShowFistPage && (
            <>
              <PaginationItem>
                <PaginationLink
                  href={{
                    pathname,
                    query: { page: 1 },
                  }}
                  scroll={false}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {[...Array(replies)].map((_, index) => {
            const pageNumber = index + 1

            const pageDifference = Math.abs(pageNumber - currentPage)

            const shouldShowPage = pageDifference < 3

            if (shouldShowPage) {
              return (
                <PaginationItem
                  key={index}
                  className={cn({
                    'hidden lg:flex': pageDifference > 0,
                  })}
                >
                  <PaginationLink
                    href={{
                      pathname,
                      query: { page: pageNumber },
                    }}
                    isActive={pageNumber === currentPage}
                    scroll={false}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return null
          })}
          {shouldShowLastPage && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href={{
                    pathname,
                    query: { page: replies.length },
                  }}
                  scroll={false}
                >
                  {replies.length}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              href={{
                pathname,
                query: {
                  page:
                    currentPage >= totalPages ? totalPages : currentPage + 1,
                },
              }}
              scroll={false}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

export default ReplyTable
