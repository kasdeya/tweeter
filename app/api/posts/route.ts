import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
export async function POST(req: Request) {
  console.log('as');
  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    // const parts = url.pathname.split('/');
    // const userId = parts[parts.length - 1];
    const userId = url.searchParams.get('userId');

    let posts;

    if (userId && typeof userId === 'string') {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
