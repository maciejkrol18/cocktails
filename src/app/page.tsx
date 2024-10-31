import CocktailFilters from '@/components/cocktail-filters'
import CocktailResult from '@/components/cocktail-result'
import Hero from '@/components/hero'
import SearchPagination from '@/components/search-pagination'

import client from '@/lib/client'
import type { CocktailFilter, CocktailsResponse } from '@/lib/types'

interface HomeProps {
  searchParams: CocktailFilter
}

async function getCocktails({ params }: { params?: CocktailFilter }) {
  const { data } = await client.get('/cocktails', { params: params })
  return data as CocktailsResponse
}

export default async function Home({ searchParams }: HomeProps) {
  const { data, meta } = await getCocktails({ params: searchParams })
  return (
    <div className="flex flex-col gap-4 px-4 container mx-auto">
      <Hero
        title="All cocktails"
        description="Find the perfect cocktail. Click on a cocktail to see more details."
      />
      <CocktailFilters
        searchInputPlaceholder={`Search ${meta.total || ''} cocktail${meta.total > 1 ? 's' : ''}...`}
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.length > 0 ? (
          data.map((cocktail) => <CocktailResult key={cocktail.id} cocktail={cocktail} />)
        ) : (
          <div className="flex flex-col justify-center align-center col-span-full border-dashed border-2 border-gray-800 rounded-lg p-4 text-center min-h-[380px]">
            <p className="text-gray-500">
              No cocktails matching your search were found 😔
            </p>
          </div>
        )}
      </div>
      <SearchPagination page={meta.currentPage} totalPages={meta.lastPage} />
    </div>
  )
}
