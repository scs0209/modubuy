import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../../lib/db'

// 리뷰를 가져오는 기능
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const productId = url.searchParams.get('productId')!
  const userId = url.searchParams.get('userId')!

  let reviews

  if (userId && productId) {
    reviews = await prisma.review.findMany({
      where: {
        AND: [{ productId }, { userId }],
      },
    })
  } else if (productId) {
    reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  }

  if (!reviews) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json(reviews, { status: 200 })
}

// 리뷰를 작성하는 기능
export async function POST(req: NextRequest) {
  const { content, rating, userId, productId } = await req.json()

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
