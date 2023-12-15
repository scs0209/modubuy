import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../utils/db'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const userId = 'clpz40ixe000013h30kpjga2v'

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      payments: true,
    },
  })
  console.log(user)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const paymentIds = user.payments.map((payment) => payment.paymentId)

  return NextResponse.json(paymentIds)
}
