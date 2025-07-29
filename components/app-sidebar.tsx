"use client"

import type * as React from "react"
import Link from "next/link"
import { Home, Book, Info, Mail, User, PlusCircle, LogOut } from "lucide-react"
import { authClient } from "@/components/auth-provider"
import { useEffect, useState } from "react"

import { SearchForm } from "./search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"

const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: Book,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userSession, setUserSession] = useState<{ id: string; name: string; email: string } | null>(null)

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession()
        setUserSession(session.data?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
        setUserSession(null)
      }
    }

    getSession()
  }, [])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      setUserSession(null)
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }


  const authOrUserItems = userSession
    ? [
        {
          title: "Create New Post",
          url: "/create-post",
          icon: PlusCircle,
        },
        {
          title: "Sign Out",
          onClick: handleSignOut,
          icon: LogOut,
        },
      ]
    : [
        {
          title: "Sign In",
          url: "/signin",
          icon: User,
        },
        {
          title: "Sign Up",
          url: "/signup",
          icon: Mail,
        },
      ]

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authOrUserItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild={!!item.url} onClick={item.onClick}>
                    {item.url ? (
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <>
                        <item.icon />
                        <span>{item.title}</span>
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground text-center">© 2025 Modern Blog</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
