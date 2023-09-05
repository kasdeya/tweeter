import { NextResponse } from 'next/server';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

export async function PATCH(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
