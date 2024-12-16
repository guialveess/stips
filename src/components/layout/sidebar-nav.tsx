"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icons from "../shared/icons";
import LogoutButton from "../shared/logout-button";

const navItems = [
  {
    title: "Projetos",
    href: "/dashboard/projects",
    icon: Icons.projectPlus,
  },
  {
    title: "Pagamento",
    href: "/dashboard/billing",
    icon: Icons.billing,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Icons.settings,
  },
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export default function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav
      className={cn(
        "flex h-full flex-col gap-y-2 lg:flex-col lg:gap-y-1.5",
        "max-w-xs", // Limita a largura
        className
      )}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            isActive(item.href)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "flex w-full items-center justify-start" // Adiciona 'w-full' para manter largura total
          )}
        >
          {<item.icon className="mr-2 h-4 w-4" />} {item.title}
        </Link>
      ))}
      <LogoutButton className="mt-auto hidden lg:block" />
    </nav>
  );
}
