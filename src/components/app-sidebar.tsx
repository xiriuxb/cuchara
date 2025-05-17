"use client"

import * as React from "react"
import {
  Home,
  Search,
  BookmarkIcon,
  ThumbsUp,
  CircleUserIcon,
  GalleryVertical
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Home",
      url: "#",
      icon: Home,
    },
    {
      name: "Posts",
      url: "#",
      icon: GalleryVertical,
    },
    {
      name: "Search",
      url: "#",
      icon: Search,
    },
    {
      name: "Bookmark",
      url: "#",
      icon: BookmarkIcon,
    },
    {
      name: "Favorites",
      url: "#",
      icon: ThumbsUp,
    },
    {
      name: "Profile",
      url: "#",
      icon: CircleUserIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        Cuchara
      </SidebarHeader>
      <SidebarTrigger className="ml-2" />
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
