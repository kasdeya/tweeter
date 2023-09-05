import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import prisma from '@/libs/prismadb';

export async function GET(req: NextApiRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 400 });
  }
}
