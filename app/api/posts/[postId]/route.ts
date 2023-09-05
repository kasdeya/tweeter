import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const postId = parts[parts.length - 1];

    if (!postId || typeof postId !== 'string') {
      return new NextResponse('[INVALID_POST_ID]', { status: 402 });
    }

    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return new NextResponse('[POST_ID_INTERNAL_ERROR]', { status: 500 });
  }
}
