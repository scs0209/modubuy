import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../utils/db'

// 리뷰를 가져오는 기능
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const productId = url.searchParams.get('productId')!
  const userId = url.searchParams.get('userId')!

  const reviews = await prisma.review.findMany({
    where: {
      AND: [{ productId }, { userId }],
    },
  })

  if (!reviews) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json(reviews, { status: 200 })
}

// 리뷰를 작성하는 기능
export async function POST(req: NextRequest, res: NextResponse) {
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
