import Hero from './_components/Hero'
import Newest from './_components/Newest'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12 dark:bg-[#121212]">
      <Hero />
      <Newest />
    </div>
  )
}
