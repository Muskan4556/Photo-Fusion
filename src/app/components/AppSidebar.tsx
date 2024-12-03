import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Files, Heart, Images } from "lucide-react";
import Link from "next/link";

const items = [
  // {
  //   title: "Home",
  //   url: "/",
  //   icon: <House style={{height: "100%", width: "100%"}}/>,
  // },
  {
    title: "Gallery",
    url: "/gallery",
    icon: <Images style={{ height: "100%", width: "100%" }} />,
  },
  {
    title: "Albums",
    url: "/albums",
    icon: <Files style={{ height: "100%", width: "100%" }} />,
  },
  {
    title: "Favourite",
    url: "/favourite",
    icon: <Heart style={{ height: "100%", width: "100%" }} />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-8 px-4 md:text-2xl text-xl font-bold tracking-tight text-blue-600">
        Library
      </SidebarHeader>
      <Separator className="my-2" />
      <SidebarContent>
        <SidebarMenu>
          {items.map(({ title, url, icon }) => (
            <SidebarMenuItem key={title} className="px-4">
              <SidebarMenuButton asChild className="px-2 py-6 space-x-1">
                <Link href={url} className="md:text-lg text-lg tracking-normal font-medium">
                  <span className="h-4 md:h-5 w-4 md:w-5">{icon}</span>{" "}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
