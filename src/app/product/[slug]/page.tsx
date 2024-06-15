import AddToBag from '@/app/_components/AddToBag'
import CheckoutNow from '@/app/_components/CheckoutNow'
import ImageGallery from '@/app/_components/ImageGallery'
import ReviewForm from '@/app/_components/comment/ReviewForm'
// import ReviewList from '@/app/_components/comment/ReviewList'
import LikesButton from '@/app/_components/mypage/LikesButton'
import { Review, fullProduct } from '@/app/interface'
import { fetchProductLikes } from '@/app/_utils/apis/likes'
import { getDetailProduct } from '@/app/_utils/apis/product'
import { fetchReviewProduct } from '@/app/_utils/apis/review'
import { authOptions } from '@/app/_utils/auth'
import { Button } from '@/components/ui/button'
import { Star, Truck } from 'lucide-react'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { getProductById } from '@/lib/actions'

const ReviewList = dynamic(
  () => import('@/app/_components/comment/ReviewList'),
  { ssr: false },
)

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  // const data: fullProduct = await getDetailProduct(params.slug)
  // const userData = await getServerSession(authOptions)
  // const rateData: Review[] = await fetchReviewProduct(data._id)
  // const likeData = await fetchProductLikes(data._id)
  // const averageRating = rateData
  //   .reduce((total, review, _, { length }) => total + review.rating / length, 0)
  //   .toFixed(2)
  const product = await getProductById(params.slug)

  return (
    <div className="pt-4 bg-white">
      <div className="relative max-w-screen-xl px-4 mx-auto md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product?.image ? product.image : []} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product?.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product?.title}
              </h2>
            </div>

            {/* <div className="flex items-center gap-3 mb-6 md:mb-10">
              <LikesButton
                user={userData?.user}
                data={data}
                likeData={likeData}
              />

              <Button className="rounded-full gap-x-2">
                <span className="text-sm">{averageRating}</span>
                <Star className="w-5 h-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                {rateData.length} Ratings
              </span>
            </div> */}

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product?.currentPrice}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${product!.currentPrice! + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5">
              {product && product.description && (
                <>
                  <AddToBag
                    currency="USD"
                    description={product.description}
                    image={product.image[0]}
                    name={product.title}
                    price={product.currentPrice}
                    price_id={product.id}
                    key={product.id}
                  />
                  <CheckoutNow
                    currency="USD"
                    description={product.description}
                    image={product.image[0]}
                    name={product.title}
                    price={product?.currentPrice}
                    price_id={product.id}
                    key={product.id}
                  />
                </>
              )}
            </div>

            <p className="mt-12 text-base tracking-wide text-gray-500">
              {product?.description}
            </p>
          </div>
        </div>

        {/* <ReviewForm user={userData?.user} product={data} />
        <ReviewList productId={data._id} /> */}
      </div>
    </div>
  )
}
