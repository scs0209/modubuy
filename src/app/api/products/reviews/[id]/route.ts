import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../../utils/db'

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

// 리뷰를 수정하는 기능
export async function PUT(
  req: Request,
  res: NextApiResponse,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const { content, rating } = await req.json()

  const updatedReview = await prisma.review.update({
    where: {
      id,
    },
    data: {
      content,
      rating,
    },
  })

  return NextResponse.json({ status: 'updated', review: updatedReview })
}

// 리뷰를 삭제하는 기능
export async function DELETE(
  req: Request,
  res: NextApiResponse,
  { params }: { params: { id: string } },
) {
  const { id } = params

  const deletedReview = await prisma.review.delete({
    where: {
      id,
    },
  })

  return NextResponse.json({ status: 'deleted', review: deletedReview })
}
