"use client";

import { useState } from "react";
import { ClipboardPlus } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: string;
  full_name: string | null;
};

export default function RequestDocument() {
  const [open, setOpen] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loadingClients, setLoadingClients] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function loadClients() {
    setLoadingClients(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc(
        "get_employee_clients"
      );

      if (error) {
        console.error(error);
        setMessage(error.message);
        return;
      }

      setClients(data ?? []);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load clients.");
    } finally {
      setLoadingClients(false);
    }
  }

  function handleOpen() {
    setClientId("");
    setTitle("");
    setDescription("");
    setMessage("");
    setSuccess(false);
    setOpen(true);

    loadClients();
  }

  async function handleRequest() {
    if (!clientId) {
      setMessage("Please select a client.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter the required document.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You are not signed in.");
        return;
      }

      const { data: employee, error: employeeError } =
        await supabase
          .from("profiles")
          .select("id, full_name, role")
          .eq("id", user.id)
          .single();

      if (
        employeeError ||
        employee?.role !== "team"
      ) {
        setMessage("You are not authorized.");
        return;
      }

      const selectedClient = clients.find(
        (client) => client.id === clientId
      );

      if (!selectedClient) {
        setMessage("Selected client was not found.");
        return;
      }

      // --------------------------------------------------
      // CREATE REQUEST
      // --------------------------------------------------

      const { data: request, error: requestError } =
        await supabase
          .from("document_requests")
          .insert({
            client_id: clientId,
            employee_id: user.id,
            title: title.trim(),
            description:
              description.trim() || null,
            status: "pending",
          })
          .select("id")
          .single();

      if (requestError || !request) {
        console.error(requestError);
        setMessage(
          requestError?.message ||
            "Unable to create document request."
        );
        return;
      }

      const employeeName =
        employee.full_name || "Your assigned employee";

      // --------------------------------------------------
      // NOTIFY CLIENT
      // --------------------------------------------------

      const { error: clientNotificationError } =
        await supabase
          .from("notifications")
          .insert({
            user_id: clientId,
            title: "Document requested",
            message: `${employeeName} has requested: ${title.trim()}.`,
            type: "document",
            read: false,
          });

      if (clientNotificationError) {
        console.error(
          "CLIENT NOTIFICATION ERROR:",
          clientNotificationError
        );
      }

      // --------------------------------------------------
      // NOTIFY ADMIN(S)
      // --------------------------------------------------

      const { data: admins, error: adminsError } =
        await supabase
          .from("profiles")
          .select("id")
          .eq("role", "admin");

      if (!adminsError && admins?.length) {
        const notifications = admins.map((admin) => ({
          user_id: admin.id,
          title: "Document request created",
          message: `${employeeName} requested "${title.trim()}" from ${selectedClient.full_name || "a client"}.`,
          type: "document",
          read: false,
        }));

        const { error } =
          await supabase
            .from("notifications")
            .insert(notifications);

        if (error) {
          console.error(
            "ADMIN NOTIFICATION ERROR:",
            error
          );
        }
      }

      setOpen(false);
      setTitle("");
      setDescription("");
      setClientId("");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    } catch (error) {
      console.error(error);
      setMessage(
        "Something went wrong while creating the request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#23272B]/10 bg-white px-4 text-xs font-medium text-[#55514B] transition-colors duration-200 hover:border-[#D9822B]/40 hover:bg-[#F7F5F1] hover:text-[#B8661A]"
      >
        <ClipboardPlus size={15} />
        Request Document
      </button>

      {success && (
        <div className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm">
          <div className="rounded-xl border border-[#D9822B]/20 bg-white px-4 py-4 shadow-[0_12px_35px_-12px_rgba(35,39,43,0.3)]">
            <p className="text-sm font-semibold text-[#23272B]">
              Document request sent
            </p>

            <p className="mt-1 text-xs leading-5 text-[#77736D]">
              The client has been notified.
            </p>
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={() => {
          if (!submitting) {
            setOpen(false);
          }
        }}
        eyebrow="Required Documents"
        title="Request Document"
      >
        <div>
          {/* CLIENT */}
          <label className="text-xs font-medium text-[#55514B]">
            Select client
          </label>

          <select
            value={clientId}
            onChange={(event) => {
              setClientId(event.target.value);
              setMessage("");
            }}
            disabled={loadingClients || submitting}
            className="mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3 text-sm text-[#23272B] outline-none focus:border-[#D9822B]"
          >
            <option value="">
              {loadingClients
                ? "Loading clients..."
                : "Select a client"}
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.full_name || "Unnamed Client"}
              </option>
            ))}
          </select>

          {/* DOCUMENT */}
          <label className="mt-5 block text-xs font-medium text-[#55514B]">
            Required document
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. GST Certificate"
            disabled={submitting}
            className="mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3 text-sm text-[#23272B] outline-none focus:border-[#D9822B]"
          />

          {/* DESCRIPTION */}
          <label className="mt-5 block text-xs font-medium text-[#55514B]">
            Instructions
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Add any instructions for the client..."
            rows={4}
            disabled={submitting}
            className="mt-2 w-full resize-none rounded-lg border border-[#23272B]/15 bg-white px-3 py-3 text-sm text-[#23272B] outline-none focus:border-[#D9822B]"
          />

          {message && (
            <div className="mt-4 rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">
                {message}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleRequest}
            disabled={
              submitting ||
              !clientId ||
              !title.trim()
            }
            className="mt-6 h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Sending..."
              : "Request Document"}
          </button>
        </div>
      </Modal>
    </>
  );
}