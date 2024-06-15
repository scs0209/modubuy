/* eslint-disable */
'use client'

import { scrapeAndStoreProduct } from '@/lib/actions'
import { SearchIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const { hostname } = parsedURL

    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

const SearchForm = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if (!isValidLink) return alert('Please provide a valid Amazon link')

    try {
      setIsLoading(true)

      // Scrape the product page
      await scrapeAndStoreProduct(searchPrompt)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="flex items-center justify-between flex-1 gap-4 p-2 bg-gray-100 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="flex-1 bg-transparent outline-none"
      />

      <button type="submit" className="cursor-pointer">
        <SearchIcon className="w-[16px] h-[16px]" />
      </button>
      {/* <Button type="submit" disabled={searchPrompt === ''}>
      </Button> */}
    </form>
  )
}

export default SearchForm
