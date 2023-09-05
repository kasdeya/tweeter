import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    const url = new URL(req.url);
    const postId = url.searchParams.get('postId');

    if (!postId || typeof postId !== 'string') {
      return new NextResponse('[INVALID_POST_ID]', { status: 401 });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone replied to your tweet!',
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log('[COMMENT]: notification error', error);
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.log(error);
    return new NextResponse('[POST_SERVER_INTERNAL_ERROR]', { status: 500 });
  }
}
