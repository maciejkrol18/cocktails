'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'

interface SearchPaginationProps {
  page: number
  totalPages: number
}

export default function SearchPagination({ page, totalPages }: SearchPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updatePage = (page: string) => {
    const params = new URLSearchParams(searchParams)
    if (page) {
      params.set('page', page)
    } else {
      params.delete('page')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlePrev = () => {
    if (page - 1 >= 1) {
      updatePage((page - 1).toString())
    }
  }

  const handleNext = () => {
    if (page + 1 <= totalPages) {
      updatePage((page + 1).toString())
    }
  }
  return (
    <div className="flex flex-col gap-4 py-4 text-center">
      <div className="flex gap-4 items-center justify-center">
        <Button onClick={() => updatePage('1')} variant={'ghost'}>
          <ChevronsLeft />
        </Button>
        <Button onClick={handlePrev} variant={'ghost'}>
          <ChevronLeft />
        </Button>
        <p className="hidden sm:block">
          Page {page} of {totalPages}
        </p>
        <Button onClick={handleNext} variant={'ghost'}>
          <ChevronRight />
        </Button>
        <Button onClick={() => updatePage(totalPages.toString())} variant={'ghost'}>
          <ChevronsRight />
        </Button>
      </div>
      <p className="block sm:hidden">
        Page {page} of {totalPages}
      </p>
    </div>
  )
}
