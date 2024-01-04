import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../utils/db'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
    return res.status(404).json({ error: 'User not found' })
  }

  return NextResponse.json(user)
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return NextResponse.json(deletedUser)
}

export async function PUT(req: Request, res: NextApiResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
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
