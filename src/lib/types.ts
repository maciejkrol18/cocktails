// Generated by Claude from https://cocktails.solvro.pl/cocktails-openapi-docs.json

// Interfaces
export interface Ingredient {
  id: number
  name: string
  description: string | null
  alcohol: boolean | null
  type: string | null
  percentage: number | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface Cocktail {
  id: number
  name: string
  instructions: string | null
  alcoholic: boolean
  category: string | null
  glass: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface CocktailWithIngredients extends Cocktail {
  ingredients: (Ingredient & { measure: string })[]
}

export interface Pagination {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

export interface PaginatedResponse<T> {
  meta: Pagination
  data: T[]
}

// Filters
export interface IngredientFilter {
  id?: number | number[] | { from?: number; to?: number }
  name?: string
  description?: string
  alcohol?: boolean
  type?: string
  percentage?: number | number[] | { from?: number; to?: number }
  createdAt?: string | string[] | { from?: string; to?: string }
  updatedAt?: string | string[] | { from?: string; to?: string }
}

export interface CocktailFilter {
  id?: number | number[] | { from?: number; to?: number }
  name?: string
  instructions?: string
  alcoholic?: boolean
  category?: string
  glass?: string
  createdAt?: string | string[] | { from?: string; to?: string }
  updatedAt?: string | string[] | { from?: string; to?: string }
  ingredientId?: number | number[] | { from?: number; to?: number }
}

export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
}

export interface PaginationOptions {
  page?: number
  perPage?: number
}

export interface IngredientQueryOptions extends PaginationOptions {
  filter?: IngredientFilter
  sort?: SortOption[]
}

export type CocktailQueryOptions = CocktailFilter & PaginationOptions

// API response types
export type IngredientsResponse = PaginatedResponse<Ingredient>
export type CocktailsResponse = PaginatedResponse<Cocktail>
export type CocktailDetailResponse = { data: CocktailWithIngredients }
