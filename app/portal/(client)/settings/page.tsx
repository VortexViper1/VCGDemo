import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditProfileForm from "@/components/portal/EditProfileForm";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role, created_at")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  return (
    <div className="p-5 md:p-8">
      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">Account</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">Profile & Settings</h1>
        <p className="mt-1 text-sm text-[#77736D]">View your account information and profile details.</p>
      </div>

      {/* PROFILE */}
      <section className="mt-8 max-w-3xl overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#23272B]/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">Profile</p>
            <h2 className="mt-1 text-lg font-semibold text-[#23272B]">Account Information</h2>
          </div>

          <EditProfileForm fullName={profile?.full_name || ""} phone={profile?.phone || ""} />
        </div>

        <div className="space-y-6 px-6 py-7">
          <div>
            <p className="text-xs text-[#9A958D]">Full name</p>
            <p className="mt-1 text-sm font-medium text-[#23272B]">{profile?.full_name || "Not provided"}</p>
          </div>

          <div>
            <p className="text-xs text-[#9A958D]">Email address</p>
            <p className="mt-1 break-all text-sm font-medium text-[#23272B]">{user.email || "Not available"}</p>
          </div>

          <div>
            <p className="text-xs text-[#9A958D]">Phone</p>
            <p className="mt-1 text-sm font-medium text-[#23272B]">{profile?.phone || "Not provided"}</p>
          </div>

          <div>
            <p className="text-xs text-[#9A958D]">Account type</p>
            <span className="mt-2 inline-flex rounded-full bg-[#F6E3CC] px-3 py-1 text-xs font-medium capitalize text-[#B8661A]">
              {isAdmin ? "Administrator" : "Client"}
            </span>
          </div>

          <div>
            <p className="text-xs text-[#9A958D]">Member since</p>
            <p className="mt-1 text-sm font-medium text-[#23272B]">
              {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Not available"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}