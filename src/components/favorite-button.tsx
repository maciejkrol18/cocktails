'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'

const LOCAL_STORAGE_KEY = 'cocktails-favorites'

interface FavoriteButtonProps {
  cocktailId: number
}

export default function FavoriteButton({ cocktailId }: FavoriteButtonProps) {
  const [favoriteCocktails, setFavoriteCocktails] = useState<number[]>([])

  useEffect(() => {
    const favorites = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (favorites) {
      setFavoriteCocktails(JSON.parse(favorites))
    }
  }, [])

  const handleFavorite = () => {
    if (favoriteCocktails.includes(cocktailId)) {
      const filtered = favoriteCocktails.filter((id) => id !== cocktailId)
      setFavoriteCocktails(filtered)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
    } else {
      setFavoriteCocktails([...favoriteCocktails, cocktailId])
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([...favoriteCocktails, cocktailId]),
      )
    }
  }

  return (
    <Button className="gap-2" onClick={handleFavorite}>
      <Heart />
      {favoriteCocktails.includes(cocktailId)
        ? 'Remove from favorites'
        : 'Add to favorites'}
    </Button>
  )
}
