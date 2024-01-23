import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim()

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '')

      let firstPrice

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0]
      }

      return firstPrice || cleanPrice
    }
  }

  return ''
}
