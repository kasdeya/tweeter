import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    // return res.status(200).json(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
