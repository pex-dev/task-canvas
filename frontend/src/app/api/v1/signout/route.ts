import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = () => {
  const cookieStore = cookies();

  cookieStore.delete('token');

  return new NextResponse(null, { status: 200 });
};
