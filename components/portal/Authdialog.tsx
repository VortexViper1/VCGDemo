"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * VISWAAS shared dialog — used for every "confirmation" moment in the
 * auth journey (email verification sent, reset link sent, password
 * updated). Not a generic modal kit: it's deliberately narrow in scope
 * to these success states, so the copy/icon slot stays consistent.
 *
 * - traps focus while open
 * - closes on Escape and backdrop click
 * - respects prefers-reduced-motion
 */

export function AuthDialog({
  open,
  onClose,
  icon,
  title,
  children,
  closable = true,
}: {
  open: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  closable?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && closable) {
        onClose?.();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus();
    };
  }, [open, closable, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        className="dialog-backdrop absolute inset-0 bg-[#23272B]/45 backdrop-blur-[2px]"
        onClick={() => closable && onClose?.()}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viswaas-dialog-title"
        tabIndex={-1}
        className="dialog-panel relative w-full max-w-[420px] rounded-t-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-7 shadow-[0_24px_60px_-20px_rgba(35,39,43,0.35)] outline-none sm:rounded-2xl sm:p-9"
      >
        {closable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#9A958D] transition-colors duration-200 hover:bg-[#E8E2D9]/60 hover:text-[#23272B]"
          >
            <X size={16} />
          </button>
        )}

        {icon && (
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#F6E3CC] text-[#B8661A]">
            {icon}
          </div>
        )}

        <h2
          id="viswaas-dialog-title"
          className="ff-serif text-[1.6rem] leading-tight text-[#23272B]"
        >
          {title}
        </h2>

        <div className="mt-3 text-[15px] leading-6 text-[#77736D]">
          {children}
        </div>
      </div>

      <style jsx>{`
        .dialog-backdrop {
          animation: fadeIn 0.2s ease both;
        }
        .dialog-panel {
          animation: panelIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes panelIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dialog-backdrop,
          .dialog-panel {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/** Small check-circle mark used inside dialogs — avoids pulling an icon
 * library asset that doesn't match the amber accent. */
export function DialogCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}