import TableView from '@/components/TableView'
import Hero from './_components/Hero'
import Newest from './_components/Newest'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="bg-white common-padding dark:bg-[#121212]">
      <Hero />
      <Newest />
      <TableView />
    </div>
  )
}
