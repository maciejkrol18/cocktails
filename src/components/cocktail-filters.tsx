'use client'

import type { CocktailCategoriesResponse, CocktailQueryOptions } from '@/lib/types'
import SearchBar from './search-bar'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { Textarea } from './ui/textarea'
import { act, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import client from '@/lib/client'
import { List, Search } from 'lucide-react'
import { stripLikeOperator } from '@/lib/utils'

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
    console.log(activeGlasses)
    handleFilterChange('glass', activeGlasses.join(','))
  }, [activeGlasses])

  useEffect(() => {
    const fetchGlasses = async () => {
      const { data } = await client.get('/cocktails/glasses')
      console.log('Glasses:', data.data)
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

  const handleInstructionsChange = useDebouncedCallback((value: string) => {
    handleFilterChange('instructions', `%${value}%`)
  }, 300)

  const handleSearchQueryChange = useDebouncedCallback((value: string) => {
    handleFilterChange('name', value ? `%${value}%` : '')
  }, 300)

  return (
    <div className="flex gap-2">
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl size-4" />
        <Input
          placeholder={searchInputPlaceholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearchQueryChange(e.target.value)
          }}
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
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => {
                  setInstructions(e.target.value)
                  handleInstructionsChange(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>
                Categories
                <br />
                <LabelDescription content="Search by the categories of the cocktails" />
              </Label>
              <div className="flex flex-wrap justify-end gap-2">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Button
                      key={category}
                      variant={'outline'}
                      className={`px-2 py-1 text-xs ${activeCategories.includes(category) ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => {
                        if (activeCategories.includes(category)) {
                          setActiveCategories(
                            activeCategories.filter((c) => c !== category),
                          )
                        } else {
                          setActiveCategories([...activeCategories, category])
                        }
                      }}
                    >
                      {category}
                    </Button>
                  ))
                ) : (
                  <p>Loading available categories...</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>
                Glasses
                <br />
                <LabelDescription content="Search by the type of glass the cocktail is served in" />
              </Label>
              <div className="flex flex-wrap justify-end gap-2">
                {glasses.length > 0 ? (
                  glasses.map((glass) => (
                    <Button
                      key={glass}
                      variant={'outline'}
                      className={`px-2 py-1 text-xs ${activeGlasses.includes(glass) ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => {
                        if (activeGlasses.includes(glass)) {
                          setActiveGlasses(activeGlasses.filter((g) => g !== glass))
                        } else {
                          setActiveGlasses([...activeGlasses, glass])
                        }
                      }}
                    >
                      {glass}
                    </Button>
                  ))
                ) : (
                  <p>Loading available glasses...</p>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
