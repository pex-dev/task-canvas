import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (token === undefined) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return fetch('http://task_canvas_api:8080/v1/verifyAuth', {
    method: 'POST',
    headers: {
      Authorization: token.value,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      return NextResponse.next();
    })
    .catch(() => NextResponse.redirect(new URL('/signin', request.url)));
}

export const config = {
  matcher: ['/'],
};
