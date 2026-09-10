import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Layers3,
  UserRound,
} from "lucide-react";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

type ClientService = {
  id: string;
  client_id: string;
  status: string | null;
  progress: number | null;
  assigned_to: string | null;
  start_date: string | null;
  task_id: string | null;
};

type Client = {
  id: string;
  full_name: string | null;
  phone: string | null;
};

type ServiceTask = {
  id: string;
  service_id: string | null;
  name: string | null;
};

type Service = {
  id: string;
  name: string | null;
};

export default async function AssignTaskPage({
  params,
  searchParams,
}: PageProps) {
  const { id: employeeId } = await params;
  const { error: errorMessage } =
    await searchParams;

  const supabase = await createClient();

  // -----------------------------------------
  // AUTH
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

  const { data: adminProfile } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (adminProfile?.role !== "admin") {
    redirect("/portal/dashboard");
  }

  // -----------------------------------------
  // EMPLOYEE
  // -----------------------------------------

  const {
    data: employee,
    error: employeeError,
  } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role")
    .eq("id", employeeId)
    .eq("role", "team")
    .single();

  if (employeeError || !employee) {
    redirect("/portal/admin/employees");
  }

  // -----------------------------------------
  // CLIENT SERVICES
  // -----------------------------------------

  const {
    data: clientServices,
    error: clientServicesError,
  } = await supabase
    .from("client_services")
    .select(`
      id,
      client_id,
      status,
      progress,
      assigned_to,
      start_date,
      task_id
    `)
    .order("start_date", {
      ascending: false,
    });

  if (clientServicesError) {
    console.error(
      "CLIENT SERVICES ERROR:",
      JSON.stringify(
        clientServicesError,
        null,
        2
      )
    );
  }

  const assignments: ClientService[] =
    clientServices ?? [];

  // -----------------------------------------
  // CLIENTS
  // -----------------------------------------

  const clientIds = [
    ...new Set(
      assignments
        .map((item) => item.client_id)
        .filter(Boolean)
    ),
  ];

  let clients: Client[] = [];

  if (clientIds.length > 0) {
    const {
      data: clientsData,
      error: clientsError,
    } = await supabase
      .from("profiles")
      .select("id, full_name, phone")
      .in("id", clientIds);

    if (clientsError) {
      console.error(
        "CLIENTS ERROR:",
        JSON.stringify(
          clientsError,
          null,
          2
        )
      );
    }

    clients = clientsData ?? [];
  }

  // -----------------------------------------
  // SERVICE TASKS / SUBTASKS
  // -----------------------------------------

  const taskIds = [
    ...new Set(
      assignments
        .map((item) => item.task_id)
        .filter(Boolean)
    ),
  ];

  let serviceTasks: ServiceTask[] = [];

  if (taskIds.length > 0) {
    const {
      data: taskData,
      error: serviceTasksError,
    } = await supabase
      .from("service_tasks")
      .select(`
        id,
        service_id,
        name
      `)
      .in("id", taskIds);

    if (serviceTasksError) {
      console.error(
        "SERVICE TASKS ERROR:",
        JSON.stringify(
          serviceTasksError,
          null,
          2
        )
      );
    }

    serviceTasks = taskData ?? [];
  }

  // -----------------------------------------
  // MAIN SERVICES
  // -----------------------------------------

  const serviceIds = [
    ...new Set(
      serviceTasks
        .map((item) => item.service_id)
        .filter(Boolean)
    ),
  ];

  let services: Service[] = [];

  if (serviceIds.length > 0) {
    const {
      data: serviceData,
      error: servicesError,
    } = await supabase
      .from("services")
      .select("id, name")
      .in("id", serviceIds);

    if (servicesError) {
      console.error(
        "SERVICES ERROR:",
        JSON.stringify(
          servicesError,
          null,
          2
        )
      );
    }

    services = serviceData ?? [];
  }

  // -----------------------------------------
  // LOOKUPS
  // -----------------------------------------

  const getClient = (
    clientId: string
  ) =>
    clients.find(
      (client) =>
        client.id === clientId
    );

  const getServiceTask = (
    taskId: string | null
  ) =>
    serviceTasks.find(
      (task) =>
        task.id === taskId
    );

  const getService = (
    taskId: string | null
  ) => {
    const serviceTask =
      getServiceTask(taskId);

    if (!serviceTask?.service_id) {
      return null;
    }

    return services.find(
      (service) =>
        service.id ===
        serviceTask.service_id
    );
  };

  // -----------------------------------------
  // CREATE TASK
  // -----------------------------------------

  async function createTask(
    formData: FormData
  ) {
    "use server";

    const supabase =
      await createClient();

    // ---------------------------------------
    // AUTH
    // ---------------------------------------

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    if (!currentUser) {
      redirect("/portal/login");
    }

    // ---------------------------------------
    // VERIFY ADMIN
    // ---------------------------------------

    const {
      data: currentProfile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", currentUser.id)
      .single();

    if (
      profileError ||
      currentProfile?.role !== "admin"
    ) {
      redirect("/portal/dashboard");
    }

    // ---------------------------------------
    // FORM DATA
    // ---------------------------------------

    const clientServiceId =
      String(
        formData.get(
          "client_service_id"
        ) ?? ""
      ).trim();

    const title =
      String(
        formData.get("title") ?? ""
      ).trim();

    const dueDate =
      String(
        formData.get("due_date") ?? ""
      ).trim();

    // ---------------------------------------
    // VALIDATION
    // ---------------------------------------

    if (
      !clientServiceId ||
      !title
    ) {
      redirect(
        `/portal/admin/employees/${employeeId}/assign?error=${encodeURIComponent(
          "Please select a client service and enter a task."
        )}`
      );
    }

    // ---------------------------------------
    // VERIFY EMPLOYEE
    // ---------------------------------------

    const {
      data: employeeCheck,
      error: employeeCheckError,
    } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", employeeId)
      .eq("role", "team")
      .single();

    if (
      employeeCheckError ||
      !employeeCheck
    ) {
      redirect(
        `/portal/admin/employees/${employeeId}/assign?error=${encodeURIComponent(
          "Employee not found."
        )}`
      );
    }

    // ---------------------------------------
    // VERIFY CLIENT SERVICE
    // ---------------------------------------

    const {
      data: clientService,
      error: clientServiceError,
    } = await supabase
      .from("client_services")
      .select(
        "id, client_id, task_id"
      )
      .eq(
        "id",
        clientServiceId
      )
      .single();

    if (
      clientServiceError ||
      !clientService
    ) {
      console.error(
        "VERIFY CLIENT SERVICE ERROR:",
        JSON.stringify(
          clientServiceError,
          null,
          2
        )
      );

      redirect(
        `/portal/admin/employees/${employeeId}/assign?error=${encodeURIComponent(
          "Selected client service could not be found."
        )}`
      );
    }

    // ---------------------------------------
    // INSERT TASK
    // ---------------------------------------

    const {
      error: taskError,
    } = await supabase
      .from("tasks")
      .insert({
        client_service_id:
          clientServiceId,
        title,
        status: "pending",
        due_date:
          dueDate || null,
        assigned_to:
          employeeId,
      });

    if (taskError) {
      console.error(
        "CREATE TASK ERROR:",
        JSON.stringify(
          taskError,
          null,
          2
        )
      );

      redirect(
        `/portal/admin/employees/${employeeId}/assign?error=${encodeURIComponent(
          taskError.message
        )}`
      );
    }

    // ---------------------------------------
    // SUCCESS
    // ---------------------------------------

    redirect(
      `/portal/admin/employees/${employeeId}?assigned=success`
    );
  }

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <main className="min-w-0 bg-[#FCFBF8] p-5 pt-7 md:p-8">

      {/* ===================================== */}
      {/* BACK */}
      {/* ===================================== */}

      <Link
        href={`/portal/admin/employees/${employeeId}`}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-[#77736D]
          transition-colors
          hover:text-[#23272B]
        "
      >
        <ArrowLeft size={16} />
        Back to Employee
      </Link>

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <section className="mt-6">

        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C49A4A]">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#23272B] md:text-3xl">
          Assign Task
        </h1>

        <p className="mt-1 text-sm text-[#77736D]">
          Create a new work item for{" "}
          <span className="font-semibold text-[#23272B]">
            {employee.full_name ||
              "this employee"}
          </span>
          .
        </p>

      </section>

      {/* ===================================== */}
      {/* EMPLOYEE CARD */}
      {/* ===================================== */}

      <section
        className="
          mt-6
          flex
          items-center
          gap-4
          rounded-2xl
          border
          border-[#23272B]/10
          bg-white
          p-5
          shadow-[0_8px_25px_rgba(35,39,43,0.03)]
        "
      >

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3E8D8] text-base font-semibold text-[#A8732A]">
          {(employee.full_name?.[0] ??
            "E").toUpperCase()}
        </div>

        <div className="min-w-0">

          <p className="truncate text-sm font-semibold text-[#23272B]">
            {employee.full_name ||
              "Unnamed Employee"}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#77736D]">

            <span className="inline-flex items-center gap-1.5">
              <UserRound size={13} />
              Employee
            </span>

            {employee.phone && (
              <span>
                {employee.phone}
              </span>
            )}

          </div>

        </div>

      </section>

      {/* ===================================== */}
      {/* ERROR */}
      {/* ===================================== */}

      {errorMessage && (
        <div
          className="
            mt-5
            rounded-xl
            border
            border-[#E5C8C8]
            bg-[#FFF8F8]
            px-4
            py-3
            text-sm
            text-[#8A4B4B]
          "
        >
          {errorMessage}
        </div>
      )}

      {/* ===================================== */}
      {/* FORM */}
      {/* ===================================== */}

      <form
        action={createTask}
        className="
          mt-5
          max-w-3xl
          rounded-2xl
          border
          border-[#23272B]/10
          bg-white
          shadow-[0_8px_30px_rgba(35,39,43,0.04)]
        "
      >

        <div className="border-b border-[#23272B]/10 px-5 py-5 md:px-7">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E8D8]">
              <ClipboardList
                size={17}
                strokeWidth={1.7}
                className="text-[#A8732A]"
              />
            </div>

            <div>

              <h2 className="text-base font-semibold text-[#23272B]">
                Task details
              </h2>

              <p className="mt-0.5 text-xs text-[#77736D]">
                Connect the work to an existing client service.
              </p>

            </div>

          </div>

        </div>

        <div className="p-5 md:p-7">

          {/* CLIENT SERVICE */}

          <div>

            <label
              htmlFor="client_service_id"
              className="mb-2 block text-sm font-semibold text-[#23272B]"
            >
              Client Service
              <span className="ml-1 text-[#C49A4A]">
                *
              </span>
            </label>

            {assignments.length === 0 ? (
              <div className="rounded-xl border border-[#23272B]/10 bg-[#FCFBF8] px-4 py-4 text-sm text-[#77736D]">
                No client services are currently available.
              </div>
            ) : (
              <select
                id="client_service_id"
                name="client_service_id"
                required
                defaultValue=""
                className="
                  h-13
                  w-full
                  rounded-xl
                  border
                  border-[#DED8CF]
                  bg-white
                  px-4
                  text-sm
                  text-[#23272B]
                  outline-none
                  transition
                  focus:border-[#C49A4A]
                  focus:ring-2
                  focus:ring-[#C49A4A]/15
                "
              >
                <option
                  value=""
                  disabled
                >
                  Select a client service
                </option>

                {assignments.map(
                  (assignment) => {
                    const client =
                      getClient(
                        assignment.client_id
                      );

                    const serviceTask =
                      getServiceTask(
                        assignment.task_id
                      );

                    const service =
                      getService(
                        assignment.task_id
                      );

                    return (
                      <option
                        key={assignment.id}
                        value={assignment.id}
                      >
                        {client?.full_name ||
                          "Unnamed Client"}{" "}
                        —{" "}
                        {service?.name ||
                          "Service"}{" "}
                        —{" "}
                        {serviceTask?.name ||
                          "Subtask"}{" "}
                        —{" "}
                        {assignment.progress ??
                          0}
                        %
                      </option>
                    );
                  }
                )}
              </select>
            )}

            <p className="mt-2 text-xs leading-5 text-[#9A958D]">
              Choose the client, main service and subtask this work belongs to.
            </p>

          </div>

          {/* TASK */}

          <div className="mt-6">

            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-[#23272B]"
            >
              Task
              <span className="ml-1 text-[#C49A4A]">
                *
              </span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Prepare GST return documents"
              className="
                h-13
                w-full
                rounded-xl
                border
                border-[#DED8CF]
                bg-white
                px-4
                text-sm
                text-[#23272B]
                outline-none
                transition
                placeholder:text-[#AAA49B]
                focus:border-[#C49A4A]
                focus:ring-2
                focus:ring-[#C49A4A]/15
              "
            />

            <p className="mt-2 text-xs text-[#9A958D]">
              Describe the specific work you want the employee to complete.
            </p>

          </div>

          {/* DUE DATE */}

          <div className="mt-6">

            <label
              htmlFor="due_date"
              className="mb-2 block text-sm font-semibold text-[#23272B]"
            >
              Due Date
            </label>

            <div className="relative">

              <CalendarDays
                size={17}
                strokeWidth={1.7}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#9A958D]
                "
              />

              <input
                id="due_date"
                name="due_date"
                type="date"
                className="
                  h-13
                  w-full
                  rounded-xl
                  border
                  border-[#DED8CF]
                  bg-white
                  pl-11
                  pr-4
                  text-sm
                  text-[#23272B]
                  outline-none
                  transition
                  focus:border-[#C49A4A]
                  focus:ring-2
                  focus:ring-[#C49A4A]/15
                "
              />

            </div>

          </div>

          {/* ASSIGNMENT INFO */}

          <div
            className="
              mt-6
              rounded-xl
              border
              border-[#C49A4A]/20
              bg-[#FDF9F1]
              p-4
            "
          >

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <ClipboardList
                  size={17}
                  strokeWidth={1.7}
                  className="text-[#A8732A]"
                />
              </div>

              <div>

                <p className="text-sm font-semibold text-[#23272B]">
                  Ready to assign
                </p>

                <p className="mt-1 text-xs leading-5 text-[#77736D]">
                  The task will be created as{" "}
                  <span className="font-medium text-[#4B4A47]">
                    pending
                  </span>{" "}
                  and assigned to{" "}
                  <span className="font-medium text-[#4B4A47]">
                    {employee.full_name ||
                      "this employee"}
                  </span>
                  .
                </p>

              </div>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href={`/portal/admin/employees/${employeeId}`}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                rounded-xl
                border
                border-[#DED8CF]
                px-6
                text-sm
                font-semibold
                text-[#4B4A47]
                transition-colors
                hover:bg-[#F7F5F1]
              "
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#C49A4A]
                px-7
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(196,154,74,0.18)]
                transition-all
                hover:-translate-y-0.5
                hover:bg-[#A8732A]
                hover:shadow-[0_12px_25px_rgba(196,154,74,0.23)]
                active:translate-y-0
              "
            >
              Assign Task
              <CheckCircle2
                size={16}
                strokeWidth={1.8}
              />
            </button>

          </div>

        </div>

      </form>

    </main>
  );
}