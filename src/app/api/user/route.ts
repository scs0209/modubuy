import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../utils/db'

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      address: true,
      detail_address: true,
      image: true,
      role: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return NextResponse.json(deletedUser)
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const updateData = await req.json()

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  })

  return NextResponse.json(updatedUser)
}
