import { redirect } from "next/navigation";
import AdminSidebar from "@/components/portal/AdminSidebar";
import AdminHeader from "@/components/portal/AdminHeader";
import { NavigationProvider } from "@/components/portal/navigation-context";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "vcg@viswaas.com";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  if (user.email?.trim().toLowerCase() !== ADMIN_EMAIL) {
    redirect("/portal/dashboard");
  }

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-[#FCFBF8] md:flex">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminHeader />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}