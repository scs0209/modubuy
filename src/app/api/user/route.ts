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
    include: {
      payments: true,
    },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const paymentIds = user.payments.map((payment) => payment.paymentId)

  return NextResponse.json(paymentIds)
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

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!)
  const userId = url.searchParams.get('userId')!

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' })
  }

  const updateData = req.body

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  })

  return NextResponse.json(updatedUser)
}
