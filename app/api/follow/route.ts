import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== 'string') {
      return new NextResponse('[FOLLOW_INVALID_USER_ID]', { status: 402 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('[FOLLOW_INVALID_USER]', { status: 402 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds.push(userId);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse('[FOLLOW_INTERNAL_ERROR]', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== 'string') {
      return new NextResponse('[FOLLOW_INVALID_USER_ID]', { status: 402 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse('[FOLLOW_INVALID_USER]', { status: 402 });
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter(
      (followingId) => followingId !== userId
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse('[FOLLOW_INTERNAL_ERROR]', { status: 500 });
  }
}
