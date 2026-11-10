"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/shared/button";

export function PractoHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-practo-bg/90 backdrop-blur border-b border-practo-border">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-practo-primary px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
              Pawzz
            </span>
            <span className="font-bold text-xl text-practo-text tracking-tight">Care</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <LocationButton label="Bengaluru, KA" />
            <a href="/search?emergency=1" className="text-practo-emergency flex items-center gap-2">
              <Clock className="w-4 h-4" /> Emergency
            </a>
            <Link href="/list-your-business">
              <Button variant="outline" size="sm">
                List Your Business
              </Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LocationButton label="Bengaluru, KA" />
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-lg bg-practo-surface border border-practo-border p-2 text-practo-text hover:bg-practo-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-practo-border bg-practo-surface">
          <div className="px-4 py-4 space-y-3 text-sm font-medium">
            <Link
              href="/"
              className="block px-3 py-2 rounded-xl hover:bg-practo-primary-light"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 rounded-xl hover:bg-practo-primary-light"
              onClick={() => setOpen(false)}
            >
              Search Providers
            </Link>
            <a
              href="/search?emergency=1"
              className="block px-3 py-2 rounded-xl hover:bg-practo-primary-light text-practo-emergency"
              onClick={() => setOpen(false)}
            >
              Emergency Services
            </a>
            <Link
              href="/list-your-business"
              className="block px-3 py-2 rounded-xl hover:bg-practo-primary-light"
              onClick={() => setOpen(false)}
            >
              List Your Business
            </Link>
            <a
              href="/submit-correction"
              className="block px-3 py-2 rounded-xl hover:bg-practo-primary-light"
              onClick={() => setOpen(false)}
            >
              Submit a Correction
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LocationButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-practo-border bg-practo-surface px-3 py-1.5 text-practo-text font-medium hover:bg-practo-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary">
      <MapPin className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

export function PractoFooter() {
  return (
    <footer className="border-t border-practo-border bg-practo-surface">
      <div className="px-4 lg:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <span className="rounded-lg bg-practo-primary px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase block mb-3">
              Pawzz
            </span>
            <span className="font-bold text-xl text-practo-text tracking-tight">Care</span>
            <p className="mt-3 text-sm text-practo-text-muted max-w-xs">
              Sample platform connecting pet owners with animal-care providers.
              All listings and testimonials are clearly labelled sample data.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-practo-text mb-4 uppercase tracking-wider">For pet owners</h3>
            <ul className="space-y-2 text-sm text-practo-text-muted">
              <li><a href="/search" className="hover:text-practo-primary">Search providers</a></li>
              <li><a href="/search?emergency=1" className="hover:text-practo-emergency">Emergency services</a></li>
              <li><a href="/submit-correction" className="hover:text-practo-primary">Submit a correction</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-practo-text mb-4 uppercase tracking-wider">For providers</h3>
            <ul className="space-y-2 text-sm text-practo-text-muted">
              <li><a href="/list-your-business" className="hover:text-practo-primary">List your business</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-practo-text mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm text-practo-text-muted">
              <li><a href="#" className="hover:text-practo-primary">About</a></li>
              <li><a href="#" className="hover:text-practo-primary">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-practo-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-practo-text-muted">
          <p>Pawzz Care — sample data for demonstration. Not a real directory.</p>
          <p>
            <a href="/ai-course" className="hover:text-practo-primary underline underline-offset-2">
              AI course landing page
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
