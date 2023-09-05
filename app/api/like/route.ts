import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    console.log('server', postId);
    const { currentUser } = await serverAuth();
    console.log('this user', currentUser.id);

    if (!postId || typeof postId !== 'string') {
      return new NextResponse('[POST_ID_DOES_NOT_EXIST]', { status: 402 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log('this post', post);
    if (!post) {
      return new NextResponse('[POST_DOES_NOT_EXIST]', { status: 402 });
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds.push(currentUser.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error);
    return new NextResponse('[FOLLOW_INTERNAL_ERROR]', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== 'string') {
      return new NextResponse('[POST_ID_DOES_NOT_EXIST]', { status: 402 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new NextResponse('[POST_DOES_NOT_EXIST]', { status: 402 });
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    updatedLikedIds = updatedLikedIds.filter(
      (likedId) => likedId !== currentUser.id
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error);
    return new NextResponse('[FOLLOW_INTERNAL_ERROR]', { status: 500 });
  }
}
