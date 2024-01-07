import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../../utils/db'

// 유저가 좋아요를 누른 상품들을 가져오는 기능
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')
  const productId = url.searchParams.get('productId')

  let likes

  if (userId) {
    likes = await prisma.like.findMany({
      where: {
        userId,
      },
    })
  } else if (productId) {
    likes = await prisma.like.findMany({
      where: {
        productId,
      },
    })
  }

  if (!likes) {
    return NextResponse.json({ error: 'Likes not found' }, { status: 404 })
  }

  return NextResponse.json(likes)
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId, productId } = await req.json()

  // 이미 좋아요가 눌러진 상품인지 확인
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })

  if (existingLike) {
    // 좋아요가 이미 눌러져 있으면 삭제
    const deletedLike = await prisma.like.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })

    return NextResponse.json({ status: 'unliked', like: deletedLike })
  }
  // 좋아요가 눌러져 있지 않으면 추가
  const newLike = await prisma.like.create({
    data: {
      userId,
      productId,
    },
  })

  return NextResponse.json({ status: 'liked', like: newLike })
}
