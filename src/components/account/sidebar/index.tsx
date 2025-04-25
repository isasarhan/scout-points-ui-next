'use client'
import React, { FC } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { generateSidebar } from './data';
import { useUserContext } from '@/providers/UserProvider';
import { Button } from '@/components/ui/button';

export interface AccountSidebarProps { }

const AccountSidebar: FC<AccountSidebarProps> = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathName = usePathname()
  const data = generateSidebar(pathName)
  const { signOut } = useUserContext()
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square bg-primary size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4 " />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Account</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <Button className="m-4" onClick={() => signOut()}>LOGOUT</Button>
    </Sidebar>
  )
};

export default AccountSidebar;