import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type PutRequestBody = {
  content: string;
  completed: boolean;
};

export async function PUT(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const body = (await req.json()) as PutRequestBody;
    const { slug } = await context.params;
    const id = slug;
    const cookieStore = await cookies();

    if (!body) {
      return NextResponse.json({ message: 'Request body is empty' }, { status: 400 });
    }
    const { content, completed } = body;

    const currentToken = cookieStore.get('token');

    if (currentToken === undefined) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`http://task_canvas_api:8080/v1/todos/${id}`, {
      method: 'PUT',
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

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error('Fetch request failed:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
