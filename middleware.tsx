import {type CookieOptions, createServerClient} from '@supabase/ssr';
import {type NextRequest, NextResponse} from 'next/server';
import {env} from './lib/env.server';

export async function middleware(request: NextRequest) {
  assert_origin: {
    const origin = new URL(request.headers.get("referer") ?? env.NEXT_PUBLIC_ORIGIN).origin;
    if (origin !== env.NEXT_PUBLIC_ORIGIN) {
      throw new Error(`You are trying to access the application from ${origin}, but the origin defined in the NEXT_PUBLIC_ORIGIN environment variable is ${env.NEXT_PUBLIC_ORIGIN}.\nYou must access the application from ${env.NEXT_PUBLIC_ORIGIN}, because some integrations will not work otherwise.`);
    }
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false, // All my Supabase access is from server, so no need to refresh the token
        detectSessionInUrl: false, // We are not using OAuth, so we don't need this. Also, we are manually "detecting" the session in the server-side code
        persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
      },
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getSession();
  return response;
}

