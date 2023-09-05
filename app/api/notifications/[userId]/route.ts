import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const userId = parts[parts.length - 1];

    if (!userId || typeof userId !== 'string') {
      return new NextResponse('[INVALID_USER_ID]', { status: 401 });
    }

    const notifications = await prisma?.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.log(error);
    return new NextResponse('[NOTIFICATIONS_INTERNAL_ERROR]', { status: 500 });
  }
}
