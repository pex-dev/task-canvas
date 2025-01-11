import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type GetResponseBody = {
  todos: {
    id: string;
    content: string;
    completed: boolean;
  }[];
};

type PostRequestBody = {
  content: string;
  completed: boolean;
};

const BASE_URL = process.env.NEXT_BACKEND_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const currentToken = cookieStore.get('token');

    if (currentToken === undefined) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BASE_URL}/v1/todos`, {
      headers: {
        Authorization: currentToken.value,
      },
    });
    const json = (await response.json()) as GetResponseBody;

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to get todos' }, { status: response.status });
    }

    const token = response.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ message: 'Failed to get todos' }, { status: 400 });
    }

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json(json.todos, { status: 200 });
  } catch (error) {
    console.error('Fetch request failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PostRequestBody;
    const cookieStore = await cookies();

    if (!body) {
      return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
    }
    const { content, completed } = body;

    const currentToken = cookieStore.get('token');

    if (currentToken === undefined) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BASE_URL}/v1/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: currentToken.value,
      },
      body: JSON.stringify({
        content: content,
        completed: completed,
      }),
      mode: 'cors',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to create todo' }, { status: response.status });
    }

    const token = response.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ message: 'Failed to create todo' }, { status: 400 });
    }

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return new NextResponse(response.body, { status: 200 });
  } catch (error) {
    console.error('Fetch request failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
