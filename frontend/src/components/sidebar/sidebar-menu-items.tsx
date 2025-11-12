"use client";

import { LayoutDashboard, Wand2, FolderOpen, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function SidebarMenuItems() {
  const path = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  let items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      active: false,
    },
    {
      title: "Create",
      url: "/dashboard/create",
      icon: Wand2,
      active: false,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderOpen,
      active: false,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      active: false,
    },
  ];

  items = items.map((item) => ({
    ...item,
    active: path === item.url,
  }));

  const handleMenuClick = () => {
    // Close mobile sidebar when clicking a menu item
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.active}
            className={cn(
              "group hover:bg-primary/10 hover:text-primary relative h-10 w-full justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              item.active && "bg-primary/15 text-primary shadow-sm",
            )}
          >
            <Link
              href={item.url}
              onClick={handleMenuClick}
              className="flex cursor-pointer items-center gap-3"
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  item.active
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary",
                )}
              />
              <span className="truncate">{item.title}</span>
              {item.active && (
                <div className="bg-primary absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full" />
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
