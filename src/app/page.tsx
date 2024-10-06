'use client'

import TableView from '@/components/TableView'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="bg-gray-200 common-padding dark:bg-[#121212]">
      {/* <Hero />
      <Newest /> */}
      <TableView />
    </div>
  )
}
