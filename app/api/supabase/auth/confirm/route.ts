import { env } from '@/lib/env.server';
import { createSupabaseForRouteHandler } from '@/lib/supabase.server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (!(token_hash && type)) {
    console.error('Missing token_hash or type');
    // return the user to an error page with some instructions
    return NextResponse.redirect(`${env.NEXT_PUBLIC_ORIGIN}/api/supabase/auth/confirm/link-malformed/`);
  }

  const supabase = createSupabaseForRouteHandler();

  const result = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (result.error) {
    console.error(result.error);
    // return the user to an error page with some instructions
    return NextResponse.redirect(`${env.NEXT_PUBLIC_ORIGIN}/api/supabase/auth/confirm/link-did-not-work`);
  }

  return NextResponse.redirect(`${env.NEXT_PUBLIC_ORIGIN}${next}`);
}