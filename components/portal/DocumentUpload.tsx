"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, FileText } from "lucide-react";
import Modal from "@/components/portal/ui/Modal";

type Props = {
  clientId: string;
};

export default function DocumentUpload({ clientId }: Props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You are not signed in.");
        setUploading(false);
        return;
      }

      const filePath = `${clientId}/${crypto.randomUUID()}-${file.name}`;

      const { error: uploadError } = await supabase.storage.from("documents").upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        setMessage(uploadError.message);
        setUploading(false);
        return;
      }

      const { error: dbError } = await supabase.from("documents").insert({
        client_id: clientId,
        uploaded_by: user.id,
        name: file.name,
        file_path: filePath,
        file_type: file.type || null,
        file_size: file.size,
      });

      if (dbError) {
        console.error(dbError);
        await supabase.storage.from("documents").remove([filePath]);
        setMessage(dbError.message);
        setUploading(false);
        return;
      }

      const { error: notificationError } = await supabase.from("notifications").insert({
        user_id: clientId,
        title: "New document available",
        message: `${file.name} has been shared with you.`,
        type: "document",
        read: false,
      });

      if (notificationError) {
        console.error("Document notification error:", notificationError);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while uploading.");
      setUploading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setFile(null);
          setOpen(true);
        }}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#23272B] px-4 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#D9822B]"
      >
        <Upload size={15} />
        Upload Document
      </button>

      <Modal open={open} onClose={() => setOpen(false)} eyebrow="Client Documents" title="Upload Document">
        <div>
          <label className="text-xs font-medium text-[#55514B]">Select file</label>

          <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#23272B]/20 bg-[#FBFAF7] px-4 py-8 text-center transition-colors duration-150 hover:border-[#C49A4A] hover:bg-[#F7F5F1]">
            <Upload size={20} className="text-[#B5AFA3]" />
            <span className="text-sm text-[#55514B]">
              {file ? "Choose a different file" : "Click to choose a file"}
            </span>
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setMessage("");
              }}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-[#F7F5F1] px-4 py-3">
              <FileText size={18} className="shrink-0 text-[#B8661A]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-[#23272B]">{file.name}</p>
                <p className="mt-0.5 text-xs text-[#77736D]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {message && (
            <div className="mt-4 rounded-lg bg-[#FBF1EE] px-4 py-3">
              <p className="text-xs text-[#B4432F]">{message}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || !file}
            className="mt-6 h-11 w-full rounded-lg bg-[#23272B] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#D9822B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </Modal>
    </>
  );
}