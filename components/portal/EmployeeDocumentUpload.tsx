"use client";

import { useEffect, useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: string;
  full_name: string | null;
};

export default function EmployeeDocumentUpload() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);

  async function loadClients() {
    setLoadingClients(true);
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

      const { data, error } = await supabase.rpc(
        "get_employee_clients"
      );

      if (error) {
        console.error(
          "EMPLOYEE CLIENTS ERROR:",
          error
        );
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
    setMessage("");
    setFile(null);
    setClientId("");
    setSuccess(false);
    setOpen(true);
    loadClients();
  }

  async function handleUpload() {
    if (!clientId) {
      setMessage("Please select a client.");
      return;
    }

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You are not signed in.");
        setUploading(false);
        return;
      }

      const {
        data: employee,
        error: employeeError,
      } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", user.id)
        .single();

      if (
        employeeError ||
        employee?.role !== "team"
      ) {
        setMessage(
          "You are not authorized to upload documents."
        );
        setUploading(false);
        return;
      }

      const selectedClient = clients.find(
        (client) => client.id === clientId
      );

      if (!selectedClient) {
        setMessage("Selected client was not found.");
        setUploading(false);
        return;
      }

      const filePath = `${clientId}/${crypto.randomUUID()}-${file.name}`;

      // --------------------------------------------------
      // UPLOAD FILE
      // --------------------------------------------------

      const { error: uploadError } =
        await supabase.storage
          .from("documents")
          .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setMessage(uploadError.message);
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // SAVE DOCUMENT
      // --------------------------------------------------

      const { error: dbError } = await supabase
        .from("documents")
        .insert({
          client_id: clientId,
          uploaded_by: user.id,
          recipient_id: clientId,
          name: file.name,
          file_path: filePath,
          file_type: file.type || null,
          file_size: file.size,
          status: "uploaded",
        });

      if (dbError) {
        console.error(dbError);

        await supabase.storage
          .from("documents")
          .remove([filePath]);

        setMessage(dbError.message);
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // NOTIFY CLIENT
      // --------------------------------------------------

      const employeeName =
        employee.full_name || "An employee";

      const { error: notificationError } =
        await supabase
          .from("notifications")
          .insert({
            user_id: clientId,
            title: "New document received",
            message: `${employeeName} has shared ${file.name} with you.`,
            type: "document",
            read: false,
          });

      if (notificationError) {
        console.error(
          "Document notification error:",
          notificationError
        );
      }

      // --------------------------------------------------
      // SUCCESS
      // --------------------------------------------------

      setOpen(false);
      setFile(null);
      setClientId("");
      setMessage("");
      setSuccess(true);

      // Refresh page after showing success state.
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage(
        "Something went wrong while uploading."
      );
      setUploading(false);
    }
  }

  return (
    <>
      {/* UPLOAD BUTTON */}
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#23272B] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
      >
        <Upload size={15} />
        Upload Document
      </button>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="flex items-start gap-3 rounded-xl border border-[#D9822B]/20 bg-white px-4 py-4 shadow-[0_12px_35px_-12px_rgba(35,39,43,0.3)]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F1E8]">
              <CheckCircle2
                size={18}
                className="text-[#47704A]"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#23272B]">
                Document sent successfully
              </p>

              <p className="mt-1 text-xs leading-5 text-[#77736D]">
                The client has been notified.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      <Modal
        open={open}
        onClose={() => {
          if (!uploading) {
            setOpen(false);
          }
        }}
        eyebrow="Employee Documents"
        title="Upload Document"
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
            disabled={loadingClients || uploading}
            className="mt-2 h-11 w-full rounded-lg border border-[#23272B]/15 bg-white px-3 text-sm text-[#23272B] outline-none transition-colors focus:border-[#D9822B]"
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

          {/* FILE */}
          <label className="mt-5 block text-xs font-medium text-[#55514B]">
            Select file
          </label>

          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#23272B]/20 bg-[#FBFAF7] px-4 py-8 text-center transition-colors duration-150 hover:border-[#C49A4A] hover:bg-[#F7F5F1]">
            <Upload
              size={20}
              className="text-[#B5AFA3]"
            />

            <span className="text-sm text-[#55514B]">
              {file
                ? "Choose a different file"
                : "Click to choose a file"}
            </span>

            <input
              type="file"
              onChange={(event) => {
                setFile(
                  event.target.files?.[0] ?? null
                );
                setMessage("");
              }}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-[#F7F5F1] px-4 py-3">
              <FileText
                size={18}
                className="shrink-0 text-[#B8661A]"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-[#23272B]">
                  {file.name}
                </p>

                <p className="mt-0.5 text-xs text-[#77736D]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">
                {message}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={
              uploading ||
              !file ||
              !clientId
            }
            className="mt-6 h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>
        </div>
      </Modal>
    </>
  );
}