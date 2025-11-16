"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      closeButton
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "rounded-2xl border border-rose-100/80 bg-white/95 text-slate-800 shadow-[0_25px_60px_-30px_rgba(244,114,182,0.6)]",
          title: "font-semibold text-base",
          description: "text-sm text-slate-600",
          actionButton:
            "rounded-full bg-rose-400 text-white text-xs font-semibold uppercase tracking-[0.25em] px-4 py-1.5",
          cancelButton:
            "rounded-full border border-slate-200 text-xs font-semibold uppercase tracking-[0.25em] px-4 py-1.5",
        },
      }}
    />
  );
}
