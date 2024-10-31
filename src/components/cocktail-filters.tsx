'use client'

import type { CocktailFilter } from '@/lib/types'
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
import { Switch } from './ui/switch'

const LOCAL_STORAGE_KEY = 'cocktails-favorites'

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

  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false)
  const [favoriteCocktails, setFavoriteCocktails] = useState<number[]>([])

  const [showAlcoholic, setShowAlcoholic] = useState<boolean>(true)

  const [categories, setCategories] = useState<string[]>([])
  const [glasses, setGlasses] = useState<string[]>([])

  const [instructions, setInstructions] = useState<string>(
    stripLikeOperator(searchParams?.get('instructions')),
  )
  const [searchQuery, setSearchQuery] = useState<string>(
    stripLikeOperator(searchParams?.get('q')),
  )

  const handleFilterChange = (filter: keyof CocktailFilter, value?: string) => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await client.get('/cocktails/categories')
      setCategories(data.data)
    }
    const fetchGlasses = async () => {
      const { data } = await client.get('/cocktails/glasses')
      setGlasses(data.data)
    }
    const favorites = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (favorites) {
      setFavoriteCocktails(JSON.parse(favorites))
    }
    fetchCategories()
    fetchGlasses()
  }, [])

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
            <div className="flex flex-col gap-2 items-end">
              <Label htmlFor="instructions">
                Favorites
                <br />
                <LabelDescription content="Only show cocktails you have favorited" />
              </Label>
              <Switch
                checked={favoritesOnly}
                onCheckedChange={(checked) => {
                  setFavoritesOnly(checked)
                  checked
                    ? handleFilterChange('id', favoriteCocktails.join(','))
                    : handleFilterChange('id', '')
                }}
              />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Label htmlFor="instructions">
                Alcoholic
                <br />
                <LabelDescription content="Show cocktails which contain alcohol" />
              </Label>
              <Switch
                checked={showAlcoholic}
                onCheckedChange={(checked) => {
                  setShowAlcoholic(checked)
                  checked
                    ? handleFilterChange('alcoholic', '')
                    : handleFilterChange('alcoholic', 'false')
                }}
              />
            </div>
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
              active={searchParams.get('category')?.split(',') || []}
              filterKey="category"
              activeSetter={handleFilterChange}
              source={categories.sort()}
              title="Categories"
              description="Search by the categories of the cocktails"
            />
            <MultiSelect
              active={searchParams.get('glass')?.split(',') || []}
              activeSetter={handleFilterChange}
              source={glasses.sort()}
              filterKey="glass"
              title="Glasses"
              description="Search by the type of glass the cocktail is served in"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
