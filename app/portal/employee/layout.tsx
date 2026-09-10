import EmployeeSidebar from "@/components/portal/EmployeeSidebar";
import EmployeeHeader from "@/components/portal/EmployeeHeader";
import { NavigationProvider } from "@/components/portal/navigation-context";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-[#FCFBF8] md:flex">
        <EmployeeSidebar />

        <div className="min-w-0 flex-1">
          <EmployeeHeader />

          <main className="min-w-0">
            {children}
          </main>
        </div>
      </div>
    </NavigationProvider>
  );
}