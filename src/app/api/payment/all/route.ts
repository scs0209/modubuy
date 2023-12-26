import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../utils/db'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const payments = await prisma.payment.findMany()

  return NextResponse.json(payments)
}
