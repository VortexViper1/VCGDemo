"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";

type Service = {
  id: string;
  name: string;
};

type Employee = {
  id: string;
  full_name: string | null;
};

type Props = {
  clientId: string;
  services: Service[];
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3.5 text-sm text-[#23272B] outline-none transition-colors duration-150 focus:border-[#D9822B] focus:ring-4 focus:ring-[#D9822B]/12";

export default function AssignServiceForm({
  clientId,
  services,
}: Props) {
  const [open, setOpen] = useState(false);

  const [serviceId, setServiceId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /*
   * Load employees when the modal opens.
   */
  useEffect(() => {
    if (!open) return;

    async function loadEmployees() {
      setLoadingEmployees(true);
      setMessage("");

      const supabase = createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "team")
        .order("full_name");

      if (error) {
        console.error(
          "EMPLOYEE LOAD ERROR:",
          error
        );

        setMessage(
          "Unable to load employees."
        );

        setLoadingEmployees(false);
        return;
      }

      setEmployees(data ?? []);
      setLoadingEmployees(false);
    }

    loadEmployees();
  }, [open]);

  async function handleAssign() {
    if (!serviceId) {
      setMessage("Please select a main service.");
      return;
    }

    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) {
      setMessage("Please enter a service task.");
      return;
    }

    if (!employeeId) {
      setMessage("Please select an employee.");
      return;
    }

    if (!dueDate) {
      setMessage("Please select a due date.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();

      /*
       * STEP 1
       * Create the service task under
       * the selected main service.
       */
      const {
        data: taskData,
        error: taskError,
      } = await supabase.rpc(
        "create_service_task",
        {
          p_service_id: serviceId,
          p_name: trimmedTaskName,
          p_description: null,
        }
      );

      if (
        taskError ||
        !taskData ||
        taskData.length === 0
      ) {
        console.error(
          "CREATE SERVICE TASK ERROR:",
          taskError
        );

        setMessage(
          taskError?.message ||
            "Failed to create service task."
        );

        setLoading(false);
        return;
      }

      const serviceTask = taskData[0];

      /*
       * STEP 2
       * Create the client service assignment.
       *
       * Status and progress are intentionally
       * controlled by the employee.
       */
      const {
        data: assignmentId,
        error: assignmentError,
      } = await supabase.rpc(
        "create_client_service_assignment",
        {
          p_client_id: clientId,
          p_task_id: serviceTask.id,
          p_status: "pending",
          p_progress: 0,
          p_start_date: new Date()
            .toISOString()
            .split("T")[0],
        }
      );

      if (
        assignmentError ||
        !assignmentId
      ) {
        console.error(
          "ASSIGN SERVICE ERROR:",
          assignmentError
        );

        setMessage(
          assignmentError?.message ||
            "Failed to assign service."
        );

        setLoading(false);
        return;
      }

      /*
       * STEP 3
       * Assign the selected employee to
       * the client service.
       */
      const {
        error: serviceAssignError,
      } = await supabase
        .from("client_services")
        .update({
          assigned_to: employeeId,
        })
        .eq("id", assignmentId);

      if (serviceAssignError) {
        console.error(
          "EMPLOYEE SERVICE ASSIGNMENT ERROR:",
          serviceAssignError
        );

        setMessage(
          serviceAssignError.message ||
            "Service was created, but employee assignment failed."
        );

        setLoading(false);
        return;
      }

      /*
       * STEP 4
       * Create the employee's actual work task.
       *
       * Due date is saved here.
       */
      const {
        data: createdTask,
        error: workTaskError,
      } = await supabase
        .from("tasks")
        .insert({
          client_service_id: assignmentId,
          title: trimmedTaskName,
          status: "pending",
          assigned_to: employeeId,
          due_date: dueDate,
        })
        .select("id")
        .single();

      if (
        workTaskError ||
        !createdTask
      ) {
        console.error(
          "EMPLOYEE TASK CREATION ERROR:",
          workTaskError
        );

        setMessage(
          workTaskError?.message ||
            "Service was assigned, but employee task creation failed."
        );

        setLoading(false);
        return;
      }

      /*
       * STEP 5
       * Notify the employee.
       */
      const {
        error: employeeNotificationError,
      } = await supabase
        .from("notifications")
        .insert({
          user_id: employeeId,
          title: "New task assigned",
          message: `${trimmedTaskName} has been assigned to you. Due date: ${new Date(
            `${dueDate}T00:00:00`
          ).toLocaleDateString()}.`,
          type: "task",
          read: false,
        });

      if (employeeNotificationError) {
        console.error(
          "EMPLOYEE NOTIFICATION ERROR:",
          employeeNotificationError
        );
      }

      /*
       * STEP 6
       * Notify the client that an employee
       * has been assigned.
       */
      const selectedService = services.find(
        (service) =>
          service.id === serviceId
      );

      const selectedEmployee =
        employees.find(
          (employee) =>
            employee.id === employeeId
        );

      const employeeName =
        selectedEmployee?.full_name ||
        "An employee";

      const formattedDueDate =
        new Date(
          `${dueDate}T00:00:00`
        ).toLocaleDateString();

      const {
        error: clientNotificationError,
      } = await supabase
        .from("notifications")
        .insert({
          user_id: clientId,
          title: "Employee assigned",
          message: `${employeeName} has been assigned to ${trimmedTaskName} under ${
            selectedService?.name ||
            "your service"
          }. Due date: ${formattedDueDate}.`,
          type: "service",
          read: false,
        });

      if (clientNotificationError) {
        console.error(
          "CLIENT NOTIFICATION ERROR:",
          clientNotificationError
        );
      }

      /*
       * STEP 7
       * Refresh the admin client page.
       */
      window.location.reload();
    } catch (error) {
      console.error(
        "ASSIGN SERVICE ERROR:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  function handleClose() {
    if (loading) return;

    setOpen(false);
    setServiceId("");
    setTaskName("");
    setEmployeeId("");
    setDueDate("");
    setMessage("");
  }

  return (
    <>
      {/* ASSIGN SERVICE BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#23272B] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
      >
        <Plus size={15} />

        Assign Service
      </button>

      {/* ASSIGN SERVICE MODAL */}

      <Modal
        open={open}
        onClose={handleClose}
        eyebrow="Client Service"
        title="Assign Service"
      >
        <div className="space-y-5">

          {/* MAIN SERVICE */}

          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Main Service
            </label>

            <select
              value={serviceId}
              onChange={(e) => {
                setServiceId(e.target.value);
                setMessage("");
              }}
              disabled={loading}
              className={inputClass}
            >
              <option value="">
                Select a main service
              </option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.name}
                </option>
              ))}
            </select>

            {services.length === 0 && (
              <p className="mt-2 text-xs text-[#B4432F]">
                No main services are available.
              </p>
            )}
          </div>

          {/* SERVICE TASK */}

          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Service Task
            </label>

            <input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                setMessage("");
              }}
              placeholder="Enter service task"
              disabled={loading}
              className={inputClass}
              maxLength={150}
            />

            <p className="mt-2 text-[11px] text-[#9A958D]">
              Enter the specific task to be
              completed for this client.
            </p>
          </div>

          {/* EMPLOYEE */}

          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Assign Employee
            </label>

            <select
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                setMessage("");
              }}
              disabled={
                loading ||
                loadingEmployees
              }
              className={inputClass}
            >
              <option value="">
                {loadingEmployees
                  ? "Loading employees..."
                  : "Select an employee"}
              </option>

              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.full_name ||
                    "Unnamed Employee"}
                </option>
              ))}
            </select>

            {!loadingEmployees &&
              employees.length === 0 && (
                <p className="mt-2 text-xs text-[#B4432F]">
                  No employees are available.
                </p>
              )}
          </div>

          {/* DUE DATE */}

          <div>
            <label className="text-xs font-medium text-[#55514B]">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                setMessage("");
              }}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              disabled={loading}
              className={inputClass}
            />

            <p className="mt-2 text-[11px] text-[#9A958D]">
              Set the date by which the employee
              should complete this task.
            </p>
          </div>

          {/* ERROR MESSAGE */}

          {message && (
            <div className="rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">
                {message}
              </p>
            </div>
          )}

          {/* ASSIGN */}

          <button
            type="button"
            onClick={handleAssign}
            disabled={
              loading ||
              loadingEmployees ||
              services.length === 0 ||
              employees.length === 0 ||
              !serviceId ||
              !taskName.trim() ||
              !employeeId ||
              !dueDate
            }
            className="h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Assigning..."
              : "Assign Service"}
          </button>
        </div>
      </Modal>
    </>
  );
}