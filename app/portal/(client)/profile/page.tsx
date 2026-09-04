import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditProfileForm from "@/components/portal/EditProfileForm";
import EditCompanyForm from "@/components/portal/EditCompanyForm";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/portal/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role, created_at")
    .eq("id", user.id)
    .single();

  const { data: company } = await supabase
    .from("companies")
    .select("id,name, website, business_type")
    .eq("owner_id", user.id)
    .maybeSingle();

  return (
    <div className="p-5 md:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#D9822B]">
          Account
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[#23272B]">
          Profile
        </h1>
        <p className="mt-1 text-sm text-[#77736D]">
          Your personal and company information.
        </p>
      </div>

      {/* Profile */}
      <section className="mt-8 rounded-xl border border-[#23272B]/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#23272B]/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
              Personal Information
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
              Your Profile
            </h2>
          </div>

          <EditProfileForm
            fullName={profile?.full_name || ""}
            phone={profile?.phone || ""}
          />
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <Info label="Full Name" value={profile?.full_name || "Not provided"} />
          <Info label="Email" value={user.email || "Not available"} />
          <Info label="Phone" value={profile?.phone || "Not provided"} />
          <Info label="Account Type" value={profile?.role || "Client"} />
          <Info
            label="Member Since"
            value={
              profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "Not available"
            }
          />
        </div>
      </section>

      {/* Company */}
      <section className="mt-8 rounded-xl border border-[#23272B]/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#23272B]/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A958D]">
              Business
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#23272B]">
              Company Information
            </h2>
          </div>

          <EditCompanyForm
            companyId={company?.id}
            initialName={company?.name || ""}
            initialWebsite={company?.website || ""}
            initialBusinessType={company?.business_type || ""}
          />
        </div>

        {company ? (
          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <Info label="Company Name" value={company.name || "Not provided"} />
            <Info
              label="Business Type"
              value={company.business_type || "Not provided"}
            />

            <div>
              <p className="text-xs text-[#9A958D]">Website</p>

              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block truncate text-sm font-medium text-[#B8661A] hover:text-[#D9822B] hover:underline"
                >
                  {company.website}
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-[#23272B]">
                  Not provided
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-[#77736D]">
              No company information has been added yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-[#9A958D]">{label}</p>
      <p className="mt-2 text-sm font-medium capitalize text-[#23272B]">
        {value}
      </p>
    </div>
  );
}