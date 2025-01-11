import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  email: string;
  password: string;
};

const BASE_URL = process.env.NEXT_BACKEND_BASE_URL;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const cookieStore = await cookies();
  if (!body) {
    return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
  }

  const { email, password } = body;

  try {
    const response = await fetch(`${BASE_URL}/v1/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      mode: 'cors',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to sign in' }, { status: response.status });
    }

    const token = response.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ message: 'Failed to sign in' }, { status: 400 });
    }

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Fetch request failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
