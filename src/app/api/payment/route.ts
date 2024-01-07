import { NextResponse, NextRequest } from 'next/server'
import prisma from '../../utils/db'

export async function GET(req: NextRequest, res: NextResponse) {
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
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const paymentIds = user.payments.map((payment) => payment.paymentId)

  return NextResponse.json(paymentIds)
}
