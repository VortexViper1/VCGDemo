import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import { NavigationProvider } from "@/components/portal/navigation-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-[#FCFBF8] md:flex">
        <PortalSidebar />
        <div className="min-w-0 flex-1">
          <PortalHeader />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </NavigationProvider>
  );
}