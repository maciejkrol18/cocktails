'use client'

import type { CocktailQueryOptions } from '@/lib/types'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import client from '@/lib/client'
import { List, Search } from 'lucide-react'
import { stripLikeOperator } from '@/lib/utils'
import MultiSelect from './multiselect'
import TextFilter from './text-filter'

interface CocktailFiltersProps {
  searchInputPlaceholder: string
}

function LabelDescription({ content }: { content: string }) {
  return <span className="text-xs text-gray-500">{content}</span>
}

export default function CocktailFilters({
  searchInputPlaceholder,
}: CocktailFiltersProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [categories, setCategories] = useState<string[]>([])
  const [activeCategories, setActiveCategories] = useState<string[]>([])

  useEffect(() => {
    handleFilterChange('category', activeCategories.join(','))
  }, [activeCategories])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await client.get('/cocktails/categories')
      setCategories(data.data)
    }
    fetchCategories()
  }, [])

  const [glasses, setGlasses] = useState<string[]>([])
  const [activeGlasses, setActiveGlasses] = useState<string[]>([])

  useEffect(() => {
    handleFilterChange('glass', activeGlasses.join(','))
  }, [activeGlasses])

  useEffect(() => {
    const fetchGlasses = async () => {
      const { data } = await client.get('/cocktails/glasses')
      setGlasses(data.data)
    }
    fetchGlasses()
  }, [])

  const [instructions, setInstructions] = useState<string>(
    stripLikeOperator(searchParams?.get('instructions')),
  )
  const [searchQuery, setSearchQuery] = useState<string>(
    stripLikeOperator(searchParams?.get('q')),
  )

  const handleFilterChange = (filter: keyof CocktailQueryOptions, value?: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(filter, value)
    } else {
      params.delete(filter)
    }
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleTextSearchChange = useDebouncedCallback(
    (filter: 'name' | 'instructions', value: string) => {
      handleFilterChange(filter, value ? `%${value}%` : '')
    },
    300,
  )

  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl size-4" />
        <TextFilter
          componentType="input"
          placeholder={searchInputPlaceholder}
          stateValue={searchQuery}
          stateSetter={setSearchQuery}
          filterName="name"
          filterSetter={handleTextSearchChange}
          className="pl-8"
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <List className="size-4" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <div className="flex flex-col gap-8 py-8 text-right">
            <div className="flex flex-col gap-2">
              <Label htmlFor="instructions">
                Instructions
                <br />
                <LabelDescription content="Search by the content of the instructions" />
              </Label>
              <TextFilter
                id="instructions"
                componentType="textarea"
                placeholder={"e.g. 'Pour all the ingredients into a glass'"}
                stateValue={instructions}
                stateSetter={setInstructions}
                filterName="instructions"
                filterSetter={handleTextSearchChange}
              />
            </div>
            <MultiSelect
              active={activeCategories}
              activeSetter={setActiveCategories}
              source={categories}
              title="Categories"
              description="Search by the categories of the cocktails"
            />
            <MultiSelect
              active={activeGlasses}
              activeSetter={setActiveGlasses}
              source={glasses}
              title="Glasses"
              description="Search by the type of glass the cocktail is served in"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
