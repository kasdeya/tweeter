import serverAuth from '@/libs/serverAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
