import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!tokenHash || type !== "email") {
    return NextResponse.redirect(
      new URL(
        "/portal/login?error=invalid_verification",
        request.url
      )
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });

  if (error) {
    console.error("Email verification error:", error);

    return NextResponse.redirect(
      new URL(
        "/portal/login?error=verification_failed",
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      "/portal/login?verified=1",
      request.url
    )
  );
}