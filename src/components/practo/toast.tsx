"use client";

import { useCallback, useState, createContext, useContext, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: Toast[];
  add: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
    },
    []
  );

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const icon = (type: ToastType) => {
    if (type === "success") return <CheckCircle2 className="w-5 h-5 text-practo-open" />;
    if (type === "error") return <AlertCircle className="w-5 h-5 text-red-600" />;
    return <Info className="w-5 h-5 text-practo-primary" />;
  };

  const style = (type: ToastType) =>
    cn(
      "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-card",
      type === "success"
        ? "bg-practo-open-light border-practo-open/30 text-practo-open"
        : type === "error"
          ? "bg-red-50 border-red-200 text-red-700"
          : "bg-practo-surface border-practo-border text-practo-text"
    );

  return (
    <ToastContext.Provider value={{ toasts, add, remove }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className={cn(style(t.type), "pointer-events-auto min-w-[260px]")}>
            <div className="flex items-center gap-3">
              {icon(t.type)}
              <div className="flex-1">
                <div className="font-semibold text-sm">{t.title}</div>
                {t.description && (
                  <div className="text-xs text-opacity-80">{t.description}</div>
                )}
              </div>
              <button
                onClick={() => remove(t.id)}
                className="ml-2 opacity-60 hover:opacity-100"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
