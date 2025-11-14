"use server";

import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { User, Sparkles, Settings } from "lucide-react";
import Link from "next/link";
import SidebarMenuItems from "./sidebar-menu-items";
import MobileSidebarClose from "./mobile-sidebar-close";
import Credits from "./credits";
import Upgrade from "./upgrade";

export default async function AppSidebar() {
  return (
    <Sidebar className="from-background to-muted/20 border-r-0 bg-gradient-to-b">
      <SidebarContent className="px-3">
        <MobileSidebarClose />
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary mt-6 mb-8 flex flex-col items-start justify-start px-2">
            <Link
              href="/"
              className="mb-1 flex cursor-pointer items-center gap-2"
            >
              <Sparkles className="text-primary h-6 w-6" />
              <p className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                AI Voice
              </p>
            </Link>
            <p className="text-muted-foreground ml-8 text-sm font-medium tracking-wide">
              Studio
            </p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-muted/30 border-t p-3">
        <div className="mb-3 flex w-full items-center justify-center gap-2 text-xs">
          <Credits />
          <Upgrade />
        </div>
        <UserButton
          variant="outline"
          className="border-muted-foreground/20 hover:border-primary/50 w-full transition-colors"
          disableDefaultLinks={true}
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/dashboard/customer-portal",
              icon: <User className="h-4 w-4" />,
            },
            {
              label: "Settings",
              href: "/dashboard/settings",
              icon: <Settings className="h-4 w-4" />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
