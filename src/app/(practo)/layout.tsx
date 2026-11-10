import { PractoHeader, PractoFooter } from "@/components/practo/layout-components";
import { ToastProvider } from "@/components/practo/toast";

export default function PractoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <PractoHeader />
      <ToastProvider>
        <main className="flex-grow">{children}</main>
      </ToastProvider>
      <PractoFooter />
    </div>
  );
}
