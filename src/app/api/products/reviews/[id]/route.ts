import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../../utils/db'

// 리뷰를 수정하는 기능
export async function PUT(
  req: Request,
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
