"use client";

import * as React from "react";
import {
  Home,
  Search,
  BookmarkIcon,
  CircleUserIcon,
  GalleryVertical,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";

// This is sample data.
const data = {
  projects: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "New Post",
      url: "/post",
      icon: GalleryVertical,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Bookmark",
      url: "#",
      icon: BookmarkIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: CircleUserIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>Cuchara</Link>
      </SidebarHeader>
      <SidebarTrigger className="ml-2" />
      <SidebarContent>
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
