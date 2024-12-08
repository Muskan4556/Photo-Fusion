"use client";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";

import { ChevronDown } from "lucide-react";
import { Files, Heart, House, Images } from "lucide-react";
import Link from "next/link";
import useGetAllRootFolder from "../client-api/folder/useGetAllRootFolders";
import { RootFolder } from "./ImageMenu";

const items = [
  {
    title: "Home",
    url: "/",
    icon: <House style={{ height: "100%", width: "100%" }} />,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: <Images style={{ height: "100%", width: "100%" }} />,
  },
  {
    title: "Albums",
    url: "#",
    icon: <Files style={{ height: "100%", width: "100%" }} />,
  },
  {
    title: "Favorites",
    url: "/favorite",
    icon: <Heart style={{ height: "100%", width: "100%" }} />,
  },
];

export function AppSidebar() {
  const { rootFoldersData } = useGetAllRootFolder();
  return (
    <Sidebar>
      <SidebarHeader className="pt-8 -mb-1 px-4 md:text-2xl text-xl font-bold tracking-tight text-blue-600">
        Library
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarMenu className="py-4">
          {items.map(({ title, url, icon }) =>
            title !== "Albums" ? (
              <SidebarMenuItem key={title} className="px-4 py-1">
                <SidebarMenuButton asChild className="px-2 space-x-1">
                  <Link
                    href={url}
                    className="md:text-lg text-lg tracking-normal font-medium"
                  >
                    <span className="h-4 md:h-5 w-4 md:w-5">{icon}</span>{" "}
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                key={title}
                className="group/collapsible"
              >
                <CollapsibleTrigger className="w-full">
                  <SidebarMenuItem className="py-1 px-4 w-full">
                    <SidebarMenuButton asChild className="px-2 space-x-1">
                      <div className=" w-full  md:text-lg text-lg tracking-normal font-medium">
                        <span className="h-4 md:h-5 w-4 md:w-5">{icon}</span>{" "}
                        <span>{title}</span>
                        <ChevronDown className="h-4 md:h-5 w-4 md:w-5 ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroup className="px-8">
                    {rootFoldersData?.folders &&
                      rootFoldersData.folders.map((folder: RootFolder) => (
                        <SidebarMenuItem key={folder.name}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/albums/${folder.name}`}
                              className="text-md tracking-normal"
                            >
                              {folder.name}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarGroup>
                </CollapsibleContent>
              </Collapsible>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
