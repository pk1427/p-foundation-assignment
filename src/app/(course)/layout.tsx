import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build with AI — Practical AI Skills Programme",
  description:
    "A cohort-based, 6-week online programme for students and young professionals. Learn prompting, AI tools, automation and building with AI. Sample data for demonstration.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Build with AI — Practical AI Skills Programme",
    description:
      "Learn by building: real projects, AI tools used in real workflows, and a portfolio you can show employers.",
    images: [{ url: "/og-course.svg" }],
    type: "website",
  },
};

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-course-bg text-course-text">
      {children}
    </div>
  );
}
