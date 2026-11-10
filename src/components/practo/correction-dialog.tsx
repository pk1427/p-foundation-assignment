"use client";

import { useState } from "react";
import { X, Mail } from "lucide-react";
import { CorrectionForm } from "@/components/practo/correction-form";
import { Button } from "@/components/shared/button";

interface CorrectionDialogProps {
  providerId: string;
}

export function CorrectionDialog({ providerId }: CorrectionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
        className="w-full min-h-[52px]"
      >
        <Mail className="w-4 h-4 mr-2" /> Submit a Correction
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            className="bg-practo-surface rounded-2xl border border-practo-border p-6 max-w-md w-full shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-practo-text">Submit a Correction</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-practo-text-muted hover:text-practo-primary"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <CorrectionForm defaultProviderId={providerId} />
          </div>
        </div>
      )}
    </>
  );
}
