import { redirect } from "next/navigation";
import SidebarNav from "@/components/layout/sidebar-nav";
import { getCurrentSession } from "@/lib/server/session";
import { ModeToggle } from "@/components/mode-toggle";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}



export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { session } = await getCurrentSession();
  if (!session) redirect("/login");
  return (
    <div className="container">
      <div className="flex min-h-[calc(100vh-140px)] flex-col gap-8 rounded-md py-8 md:min-h-[calc(100vh-160px)] lg:flex-row 2xl:gap-12">
        <aside className="lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}