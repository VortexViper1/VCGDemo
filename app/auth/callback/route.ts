import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "vcg@viswaas.com";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      `${origin}/portal/login?error=google_auth`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Google OAuth callback error:", error);

    return NextResponse.redirect(
      `${origin}/portal/login?error=google_auth`
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email?.trim().toLowerCase() === ADMIN_EMAIL) {
    return NextResponse.redirect(`${origin}/portal/admin`);
  }

  return NextResponse.redirect(`${origin}/portal/dashboard`);
}