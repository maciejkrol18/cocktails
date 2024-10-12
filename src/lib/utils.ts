import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripLikeOperator(value: string | null) {
  return value ? value.substring(1, value.length - 1) : ''
}
