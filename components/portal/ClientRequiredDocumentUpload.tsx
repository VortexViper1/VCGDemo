"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";
import { createClient } from "@/lib/supabase/client";

type Props = {
  requestId: string;
  title: string;
  employeeId: string;
};

export default function ClientRequiredDocumentUpload({
  requestId,
  title,
  employeeId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpload() {
    if (!file) {
      setMessage("Please select the requested document.");
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

      // --------------------------------------------------
      // VERIFY REQUEST BELONGS TO THIS CLIENT
      // --------------------------------------------------

      const { data: request, error: requestError } =
        await supabase
          .from("document_requests")
          .select(`
            id,
            client_id,
            employee_id,
            title,
            status
          `)
          .eq("id", requestId)
          .eq("client_id", user.id)
          .single();

      if (requestError || !request) {
        setMessage("This document request could not be found.");
        setUploading(false);
        return;
      }

      if (request.status !== "pending") {
        setMessage("This document request has already been completed.");
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // MAKE SURE EMPLOYEE MATCHES REQUEST
      // --------------------------------------------------

      if (request.employee_id !== employeeId) {
        setMessage("Invalid employee assignment.");
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // GET CLIENT PROFILE
      // --------------------------------------------------

      const { data: clientProfile } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", user.id)
        .single();

      if (clientProfile?.role !== "client") {
        setMessage("You are not authorized.");
        setUploading(false);
        return;
      }

      const clientName =
        clientProfile.full_name || "Client";

      // --------------------------------------------------
      // UPLOAD FILE TO STORAGE
      // --------------------------------------------------

      const filePath = `${user.id}/${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("documents")
          .upload(filePath, file);

      if (uploadError) {
        console.error(
          "CLIENT DOCUMENT STORAGE ERROR:",
          uploadError
        );

        setMessage(uploadError.message);
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // SAVE DOCUMENT
      // --------------------------------------------------

      const { error: documentError } =
        await supabase
          .from("documents")
          .insert({
            client_id: user.id,
            uploaded_by: user.id,
            recipient_id: employeeId,
            request_id: requestId,
            name: file.name,
            file_path: filePath,
            file_type: file.type || null,
            file_size: file.size,
            status: "uploaded",
          });

      if (documentError) {
        console.error(
          "CLIENT DOCUMENT INSERT ERROR:",
          documentError
        );

        await supabase.storage
          .from("documents")
          .remove([filePath]);

        setMessage(documentError.message);
        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // MARK REQUEST AS FULFILLED
      // --------------------------------------------------

      const { error: updateError } =
        await supabase
          .from("document_requests")
          .update({
            status: "fulfilled",
            fulfilled_at: new Date().toISOString(),
          })
          .eq("id", requestId)
          .eq("client_id", user.id)
          .eq("status", "pending");

      if (updateError) {
        console.error(
          "DOCUMENT REQUEST UPDATE ERROR:",
          updateError
        );

        setMessage(
          "Document uploaded, but the request could not be updated."
        );

        setUploading(false);
        return;
      }

      // --------------------------------------------------
      // NOTIFY EMPLOYEE
      // --------------------------------------------------

      const { error: employeeNotificationError } =
        await supabase
          .from("notifications")
          .insert({
            user_id: employeeId,
            title: "Requested document received",
            message: `${clientName} has submitted ${file.name} for the requested document "${title}".`,
            type: "document",
            read: false,
          });

      if (employeeNotificationError) {
        console.error(
          "EMPLOYEE NOTIFICATION ERROR:",
          employeeNotificationError
        );
      }

      // --------------------------------------------------
      // GET ADMINS
      // --------------------------------------------------

      const { data: admins, error: adminsError } =
        await supabase
          .from("profiles")
          .select("id")
          .eq("role", "admin");

      if (!adminsError && admins?.length) {
        const adminNotifications = admins.map(
          (admin) => ({
            user_id: admin.id,
            title: "Requested document received",
            message: `${clientName} submitted ${file.name} for "${title}".`,
            type: "document",
            read: false,
          })
        );

        const {
          error: adminNotificationError,
        } = await supabase
          .from("notifications")
          .insert(adminNotifications);

        if (adminNotificationError) {
          console.error(
            "ADMIN NOTIFICATION ERROR:",
            adminNotificationError
          );
        }
      }

      // --------------------------------------------------
      // SUCCESS
      // --------------------------------------------------

      setOpen(false);
      setFile(null);
      setMessage("");
      setSuccess(true);

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong while uploading the document."
      );

      setUploading(false);
    }
  }

  return (
    <>
      {/* UPLOAD BUTTON */}
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setFile(null);
          setSuccess(false);
          setOpen(true);
        }}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#23272B] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
      >
        <Upload size={14} />
        Upload Requested Document
      </button>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm">
          <div className="rounded-xl border border-[#D9822B]/20 bg-white px-4 py-4 shadow-[0_12px_35px_-12px_rgba(35,39,43,0.3)]">
            <p className="text-sm font-semibold text-[#23272B]">
              Document submitted
            </p>

            <p className="mt-1 text-xs leading-5 text-[#77736D]">
              The employee and admin have been notified.
            </p>
          </div>
        </div>
      )}

      {/* MODAL */}
      <Modal
        open={open}
        onClose={() => {
          if (!uploading) {
            setOpen(false);
          }
        }}
        eyebrow="Required Document"
        title={title}
      >
        <div>
          <p className="text-sm leading-6 text-[#77736D]">
            Upload the document requested by your assigned
            employee.
          </p>

          {/* FILE */}
          <label className="mt-5 block text-xs font-medium text-[#55514B]">
            Select document
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
            disabled={uploading || !file}
            className="mt-6 h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : "Submit Document"}
          </button>
        </div>
      </Modal>
    </>
  );
}