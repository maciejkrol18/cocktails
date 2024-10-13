import FavoriteButton from '@/components/favorite-button'
import { Button } from '@/components/ui/button'
import client from '@/lib/client'
import type { CocktailDetailResponse } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Citrus,
  CupSoda,
  Grid2X2,
  ImageIcon,
  Martini,
  Percent,
  Scale,
  ScrollText,
  Wine,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CocktailPageProps {
  params: {
    id: string
  }
}

function MetadataEntry({
  icon,
  label,
  value,
  className,
}: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className="flex gap-2 items-center text-sm font-semibold">
        {icon} {label}
      </p>
      <p className="text-gray-500">{value}</p>
    </div>
  )
}

async function getCocktail(id: string) {
  try {
    const { data, status } = await client.get(`/cocktails/${id}`)
    if (status !== 200) notFound()
    return data as CocktailDetailResponse
  } catch {
    notFound()
  }
}

export default async function CocktailPage({ params }: CocktailPageProps) {
  const { data } = await getCocktail(params.id)
  return (
    <div className="flex flex-col gap-8 px-4 container mx-auto max-w-2xl">
      <Button asChild variant={'outline'} className="flex items-center gap-2 w-fit">
        <Link href="/">
          <ArrowLeft className="size-4" /> Back to all cocktails
        </Link>
      </Button>
      <div>
        <h1 className="text-3xl font-semibold text-center">{data.name}</h1>
        <p className="text-lg text-center">{data.category || 'Unknown category'}</p>
      </div>
      {data.imageUrl ? (
        <Image
          src={data.imageUrl}
          alt={data.name}
          width={400}
          height={400}
          className="rounded-full mx-auto object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-600 rounded-lg">
          <ImageIcon />
        </div>
      )}
      <FavoriteButton cocktailId={data.id} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <MetadataEntry
          icon={<Wine />}
          label="Glass"
          value={data.glass || 'Unknown glass'}
        />
        <MetadataEntry
          icon={<Martini />}
          label="Is alcoholic?"
          value={data.alcoholic ? 'Yes' : 'No'}
        />
        <MetadataEntry
          icon={<ScrollText />}
          label="Instructions"
          value={data.instructions || 'No instructions'}
          className="sm:col-span-2 md:col-span-3 lg:col-span-1 lg:row-span-2"
        />
        <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-3">
          <p className="flex gap-2 items-center text-sm font-semibold">
            <Citrus /> Ingredients
          </p>
          <ul className="flex flex-col gap-4 py-2">
            {data.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex flex-col gap-2 bg-card p-2 rounded-lg"
              >
                <p className="flex items-center gap-2">
                  {ingredient.imageUrl ? (
                    <Image
                      src={ingredient.imageUrl}
                      alt={ingredient.name}
                      width={40}
                      height={40}
                      className="rounded-full bg-gray-800"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      ?
                    </div>
                  )}{' '}
                  {ingredient.name}
                </p>
                {ingredient.alcohol ? (
                  <p className="flex gap-2 items-center text-orange-700">
                    <Martini className="inline size-4" />
                    Alcoholic
                  </p>
                ) : (
                  <p className="flex gap-2 items-center text-green-700">
                    <CupSoda className="inline size-4" />
                    Non-alcoholic
                  </p>
                )}
                {ingredient.type && (
                  <p
                    className="flex gap-2 items-center text-gray-500"
                    title="Ingredient type"
                  >
                    <Grid2X2 className="inline size-4" /> {ingredient.type}
                  </p>
                )}
                {ingredient.percentage && (
                  <p
                    className="flex gap-2 items-center text-gray-500"
                    title="Alcohol percentage"
                  >
                    <Percent className="inline size-4" /> {ingredient.percentage}
                  </p>
                )}
                <p
                  className="flex gap-2 items-center text-gray-500"
                  title="Ingredient measure"
                >
                  <Scale className="inline size-4" />
                  {ingredient.measure}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
