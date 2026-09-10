import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

type Employee = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
};

type Task = {
  id: string;
  title: string | null;
  status: string | null;
  due_date: string | null;
  assigned_to: string | null;
};

export default async function AdminEmployeesPage() {
  const supabase = await createClient();

  // -----------------------------------------
  // AUTHENTICATION
  // -----------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // -----------------------------------------
  // VERIFY ADMIN
  // -----------------------------------------

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // -----------------------------------------
  // GET EMPLOYEES
  // -----------------------------------------

  const { data: employees, error: employeesError } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("role", "team")
    .order("created_at", { ascending: false });

  // -----------------------------------------
  // GET ALL TASKS
  // -----------------------------------------

  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select(
      "id, title, status, due_date, assigned_to"
    )
    .not("assigned_to", "is", null);

  if (employeesError) {
    console.error("EMPLOYEES ERROR:", employeesError);
  }

  if (tasksError) {
    console.error("TASKS ERROR:", tasksError);
  }

  const employeeList: Employee[] = employees ?? [];
  const taskList: Task[] = tasks ?? [];

  // -----------------------------------------
  // TASK COUNTS
  // -----------------------------------------

  const getEmployeeTasks = (employeeId: string) =>
    taskList.filter(
      (task) => task.assigned_to === employeeId
    );

  const isCompleted = (status: string | null) =>
    status === "completed" ||
    status === "complete" ||
    status === "done";

  const totalTasks = taskList.length;

  const pendingTasks = taskList.filter(
    (task) => !isCompleted(task.status)
  ).length;

  const completedTasks = taskList.filter(
    (task) => isCompleted(task.status)
  ).length;

  return (
    <main className="min-w-0 p-5 pt-8 md:p-8">

      {/* ---------------------------------- */}
      {/* HEADER */}
      {/* ---------------------------------- */}

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-[#C49A4A]">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-[#23272B] md:text-3xl">
          Employees
        </h1>

        <p className="mt-1 max-w-xl text-sm leading-6 text-[#77736D]">
          View your onboarded employees and the tasks currently assigned
          to them.
        </p>
      </div>

      {/* ---------------------------------- */}
      {/* SUMMARY */}
      {/* ---------------------------------- */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Employees */}

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5 md:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#77736D]">
              Employees
            </p>

            <Users
              size={19}
              strokeWidth={1.7}
              className="text-[#A8732A]"
            />
          </div>

          <p className="mt-3 text-3xl font-semibold text-[#23272B]">
            {employeeList.length}
          </p>
        </div>

        {/* Pending */}

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5 md:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#77736D]">
              Pending Tasks
            </p>

            <Clock3
              size={19}
              strokeWidth={1.7}
              className="text-[#A8732A]"
            />
          </div>

          <p className="mt-3 text-3xl font-semibold text-[#23272B]">
            {pendingTasks}
          </p>
        </div>

        {/* Completed */}

        <div className="rounded-xl border border-[#23272B]/10 bg-white p-5 md:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#77736D]">
              Completed Tasks
            </p>

            <CheckCircle2
              size={19}
              strokeWidth={1.7}
              className="text-[#A8732A]"
            />
          </div>

          <p className="mt-3 text-3xl font-semibold text-[#23272B]">
            {completedTasks}
          </p>
        </div>

      </div>

      {/* ---------------------------------- */}
      {/* EMPLOYEE LIST */}
      {/* ---------------------------------- */}

      <section className="mt-8 overflow-hidden rounded-xl border border-[#23272B]/10 bg-white">

        <div className="border-b border-[#23272B]/10 px-5 py-5 md:px-6">
          <h2 className="text-base font-semibold text-[#23272B]">
            Onboarded Employees
          </h2>

          <p className="mt-1 text-xs text-[#77736D]">
            Employees available for task assignment.
          </p>
        </div>

        {employeeList.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users
              size={30}
              strokeWidth={1.5}
              className="mx-auto text-[#9A958D]"
            />

            <p className="mt-4 text-sm text-[#77736D]">
              No employees have been onboarded yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#23272B]/10">

            {employeeList.map((employee) => {
              const employeeTasks = getEmployeeTasks(
                employee.id
              );

              const employeePendingTasks =
                employeeTasks.filter(
                  (task) => !isCompleted(task.status)
                );

              const employeeCompletedTasks =
                employeeTasks.filter(
                  (task) => isCompleted(task.status)
                );

              const initial =
                employee.full_name?.trim()?.[0]?.toUpperCase() ??
                "E";

              return (
                <Link
                  key={employee.id}
                  href={`/portal/admin/employees/${employee.id}`}
                  className="group block px-5 py-5 transition-colors hover:bg-[#FCFBF8] md:px-6"
                >

                  <div className="flex items-start gap-4">

                    {/* AVATAR */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3E8D8] text-sm font-medium text-[#A8732A]">
                      {initial}
                    </div>

                    {/* EMPLOYEE INFO */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-medium text-[#23272B]">
                            {employee.full_name ||
                              "Unnamed Employee"}
                          </h3>

                          <p className="mt-1 text-xs text-[#77736D]">
                            {employee.phone ||
                              "No phone number"}
                          </p>

                        </div>

                        {/* ARROW */}

                        <ChevronRight
                          size={18}
                          strokeWidth={1.7}
                          className="hidden shrink-0 text-[#9A958D] transition-transform group-hover:translate-x-1 sm:block"
                        />

                      </div>

                      {/* TASK STATS */}

                      <div className="mt-4 flex flex-wrap gap-2">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F1] px-3 py-1 text-xs text-[#4B4A47]">
                          <ClipboardList size={13} />
                          {employeeTasks.length}{" "}
                          {employeeTasks.length === 1
                            ? "task"
                            : "tasks"}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7EA] px-3 py-1 text-xs text-[#A8732A]">
                          <Clock3 size={13} />
                          {employeePendingTasks.length} pending
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F7F3] px-3 py-1 text-xs text-[#55705A]">
                          <CheckCircle2 size={13} />
                          {employeeCompletedTasks.length} completed
                        </span>

                      </div>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}