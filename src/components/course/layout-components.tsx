"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Mail } from "lucide-react";

export function CourseHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-course-border bg-course-bg/80 backdrop-blur">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/ai-course"
            className="flex items-center gap-2"
            aria-label="Build with AI — home"
          >
            <span className="rounded bg-course-accent px-2 py-1 text-[10px] font-bold tracking-wider text-course-bg uppercase">
              Pawzz
            </span>
            <span className="font-bold text-xl text-course-text tracking-tight">
              Build<span className="text-course-accent"> with AI</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#how-it-works" className="text-course-text-muted hover:text-course-accent transition-colors">
              How it works
            </a>
            <a href="#curriculum" className="text-course-text-muted hover:text-course-accent transition-colors">
              Curriculum
            </a>
            <a href="#pricing" className="text-course-text-muted hover:text-course-accent transition-colors">
              Batch & pricing
            </a>
            <a href="#faq" className="text-course-text-muted hover:text-course-accent transition-colors">
              FAQ
            </a>
            <Link
              href="/"
              className="text-course-text-muted hover:text-course-accent transition-colors"
            >
              Back to Practo for Animals
            </Link>
            <a href="#register" className="text-course-accent font-semibold hover:underline underline-offset-4">
              Reserve your seat
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Link href="/" className="text-course-text-muted hover:text-course-accent">
              Back to Practo
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-lg border border-course-border p-2 text-course-text hover:bg-course-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-course-accent"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-course-border bg-course-surface">
          <div className="px-6 py-5 space-y-4 text-sm font-medium">
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-xl hover:bg-course-surface/50"
              onClick={() => setOpen(false)}
            >
              How it works
            </a>
            <a
              href="#curriculum"
              className="block px-3 py-2 rounded-xl hover:bg-course-surface/50"
              onClick={() => setOpen(false)}
            >
              Curriculum
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-xl hover:bg-course-surface/50"
              onClick={() => setOpen(false)}
            >
              Batch & pricing
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 rounded-xl hover:bg-course-surface/50"
              onClick={() => setOpen(false)}
            >
              FAQ
            </a>
            <Link
              href="/"
              className="block px-3 py-2 rounded-xl hover:bg-course-surface/50"
              onClick={() => setOpen(false)}
            >
              Back to Practo for Animals
            </Link>
            <a
              href="#register"
              className="block w-full bg-course-accent text-course-bg text-center py-3 rounded-xl font-semibold hover:bg-course-accent/90"
              onClick={() => setOpen(false)}
            >
              Reserve your seat
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function CourseFooter() {
  return (
    <footer className="border-t border-course-border bg-course-bg">
      <div className="px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <span className="rounded bg-course-accent px-2 py-1 text-[10px] font-bold tracking-wider text-course-bg uppercase block mb-3">
              Pawzz
            </span>
            <span className="font-bold text-xl text-course-text tracking-tight">
              Build<span className="text-course-accent"> with AI</span>
            </span>
            <p className="mt-4 text-sm text-course-text-muted max-w-xs">
              Sample landing page for a practical AI skills programme. All
              stats, testimonials and batch details are clearly labelled sample
              data — no real guarantees or press mentions.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-course-text-muted uppercase tracking-wider mb-5">
              Programme
            </h3>
            <ul className="space-y-3 text-sm text-course-text-muted">
              <li><a href="#how-it-works" className="hover:text-course-accent">How it works</a></li>
              <li><a href="#curriculum" className="hover:text-course-accent">Curriculum</a></li>
              <li><a href="#pricing" className="hover:text-course-accent">Batch & pricing</a></li>
              <li><a href="#faq" className="hover:text-course-accent">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-course-text-muted uppercase tracking-wider mb-5">
              Enrol
            </h3>
            <ul className="space-y-3 text-sm text-course-text-muted">
              <li><a href="#register" className="hover:text-course-accent">Reserve your seat</a></li>
              <li><a href="#" className="hover:text-course-accent">Download syllabus</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-course-text-muted uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-course-text-muted">
              <li><a href="#" className="hover:text-course-accent">About</a></li>
              <li><a href="#" className="hover:text-course-accent">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-course-border pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-course-text-muted">
          <p>Pawzz Foundation — sample data for demonstration.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-course-accent underline underline-offset-2">
              Practo for Animals
            </Link>
            <a href="mailto:demo@example.com" className="hover:text-course-accent">
              <Mail className="w-3 h-3 inline mr-1" /> demo@example.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
