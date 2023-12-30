import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../utils/db'

// 리뷰를 가져오는 기능
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!)
  const reviewId = url.searchParams.get('reviewId')!

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  })

  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json(review, { status: 200 })
}

// 리뷰를 작성하는 기능
export async function POST(req: Request, res: NextApiResponse) {
  const { content, rating, userId, productId } = await req.json()

  console.log('newReview: ', req.json())

  const newReview = await prisma.review.create({
    data: {
      content,
      rating,
      userId,
      productId,
    },
  })

  return NextResponse.json({ status: 'created', review: newReview })
}
