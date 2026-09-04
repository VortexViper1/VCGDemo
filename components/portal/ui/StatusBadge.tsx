type Status =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "review"
  | "completed"
  | string;

const STATUS_STYLES: Record<
  string,
  {
    label: string;
    dot: string;
    text: string;
    bg: string;
  }
> = {
  pending: {
    label: "Pending",
    dot: "bg-[#9A958D]",
    text: "text-[#6B675F]",
    bg: "bg-[#F2F0EC]",
  },

  confirmed: {
    label: "Confirmed",
    dot: "bg-[#6B8CA6]",
    text: "text-[#3E5A70]",
    bg: "bg-[#EAF0F4]",
  },

  in_progress: {
    label: "In Progress",
    dot: "bg-[#D9822B]",
    text: "text-[#B8661A]",
    bg: "bg-[#F6E3CC]",
  },

  review: {
    label: "Review",
    dot: "bg-[#D9822B]",
    text: "text-[#8A6A2E]",
    bg: "bg-[#F6EEDB]",
  },

  completed: {
    label: "Completed",
    dot: "bg-[#4B7A5C]",
    text: "text-[#3B6049]",
    bg: "bg-[#EAF2EC]",
  },
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: Status;
  className?: string;
}) {
  const style = STATUS_STYLES[status] ?? {
    label: status?.replace(/_/g, " ") || "Unknown",
    dot: "bg-[#9A958D]",
    text: "text-[#6B675F]",
    bg: "bg-[#F2F0EC]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${style.bg} ${style.text} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}