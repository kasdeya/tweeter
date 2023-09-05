import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const userId = parts[parts.length - 1];

    if (!userId || typeof userId !== 'string') {
      return new NextResponse('Invalid user ID', { status: 402 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 400 });
  }
}
