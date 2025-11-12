import "~/styles/globals.css";
import { Providers } from "~/components/providers";
import { Toaster } from "~/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "~/components/ui/breadcrumb";
import { type Metadata } from "next";
import BreadcrumbPageClient from '~/components/sidebar/breadcrumb-page-client';
import AppSidebar from '~/components/sidebar/app-sidebar';

export const metadata: Metadata = {
  title: "AI Voice Studio",
  description: "AI Voice Studio - Transform text into natural speech",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex h-screen flex-col">
          <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur">
            <div className="flex shrink-0 grow items-center gap-3">
              <SidebarTrigger className="hover:bg-muted -ml-1 h-8 w-8 transition-colors" />
              <Separator
                orientation="vertical"
                className="mr-2 h-6 data-[orientation=vertical]:h-6"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPageClient />
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="from-background to-muted/20 flex-1 overflow-y-auto bg-gradient-to-br p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </Providers>
  );
}
