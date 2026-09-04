import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;

  if (!code) {
    return NextResponse.redirect(
      new URL("/portal/login?error=google_auth", origin)
    );
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("Google OAuth callback error:", exchangeError);

    return NextResponse.redirect(
      new URL("/portal/login?error=google_auth", origin)
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      new URL("/portal/login?error=no_user", origin)
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Profile lookup error:", profileError);

    return NextResponse.redirect(
      new URL("/portal/login?error=profile", origin)
    );
  }

  if (profile?.role === "admin") {
    return NextResponse.redirect(
      new URL("/portal/admin", origin)
    );
  }

  return NextResponse.redirect(
    new URL("/portal/dashboard", origin)
  );
}