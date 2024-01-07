import AddToBag from '@/app/components/AddToBag'
import CheckoutNow from '@/app/components/CheckoutNow'
import ImageGallery from '@/app/components/ImageGallery'
import ReviewForm from '@/app/components/comment/ReviewForm'
import CommentList from '@/app/components/comment/ReviewList'
import LikesButton from '@/app/components/mypage/LikesButton'
import { Review, fullProduct } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import { fetchProductLikes } from '@/app/utils/apis/likes'
import { fetchReview } from '@/app/utils/apis/review'
import { authOptions } from '@/app/utils/auth'
import { Button } from '@/components/ui/button'
import { Star, Truck } from 'lucide-react'
import { getServerSession } from 'next-auth'

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0] {
    _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "categoryName": category->name,
      price_id,
  }`

  const data = client.fetch(query)

  return data
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const data: fullProduct = await getData(params.slug)
  const userData = await getServerSession(authOptions)
  const rateData: Review[] = await fetchReview(data._id, userData?.user.id)
  const likeData = await fetchProductLikes(data._id)
  const averageRating = rateData
    .reduce((total, review, _, { length }) => total + review.rating / length, 0)
    .toFixed(2)

  console.log('likeData', likeData)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <LikesButton
                user={userData?.user}
                data={data}
                likeData={likeData}
              />

              <Button className="rounded-full gap-x-2">
                <span className="text-sm">{averageRating}</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                {rateData.length} Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
                key={data._id}
              />
              <CheckoutNow
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
                key={data._id}
              />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>

        <ReviewForm user={userData?.user} product={data} />
        <CommentList productId={data._id} userId={userData?.user.id} />
      </div>
    </div>
  )
}
