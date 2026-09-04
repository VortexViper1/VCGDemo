"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  filePath: string;
  fileName: string;
};

export default function DocumentDownload({ filePath, fileName }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.storage.from("documents").createSignedUrl(filePath, 60);

      if (error) {
        console.error(error);
        alert("Unable to open this document.");
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to open this document.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      title={`Download ${fileName}`}
      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#23272B]/10 px-3 text-xs font-medium text-[#55514B] transition-colors duration-150 hover:border-[#C49A4A]/40 hover:bg-[#F7F5F1] hover:text-[#B8661A] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={15} />
      {loading ? "Opening..." : "View"}
    </button>
  );
}