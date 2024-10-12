import type { Cocktail } from '@/lib/types'
import { CupSoda, Grid2X2, Martini, Wine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CocktailResultProps {
  cocktail: Cocktail
}

export default function CocktailResult({ cocktail }: CocktailResultProps) {
  return (
    <Link
      className="flex flex-col gap-4 items-center justify-center bg-card p-4 rounded-lg shadow-md hover:ring hover:ring-ring/30 transition-shadow"
      key={cocktail.id}
      href={`/cocktails/${cocktail.id}`}
    >
      {cocktail.imageUrl ? (
        <Image
          src={cocktail.imageUrl}
          alt={cocktail.name}
          width={200}
          height={200}
          className="rounded-full"
        />
      ) : (
        <div className="size-[200px] bg-gray-600">?</div>
      )}
      <p className="text-lg font-semibold">{cocktail.name}</p>
      <div className="flex flex-col gap-2 items-center">
        {cocktail.alcoholic ? (
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
        <p className="flex gap-2 items-center text-gray-500">
          <Wine className="size-4" /> {cocktail.glass}
        </p>
        <p className="flex gap-2 items-center text-gray-500">
          <Grid2X2 className="inline size-4" /> {cocktail.category}
        </p>
      </div>
    </Link>
  )
}
