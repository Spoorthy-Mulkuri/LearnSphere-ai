'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import {
  Book,
  BrainCircuit,
  Code,
  LayoutDashboard,
  ListChecks,
  Mic,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/learning-path', icon: Book, label: 'Learning Path' },
  { href: '/dashboard/concept-explainer', icon: BrainCircuit, label: 'Concept Explainer' },
  { href: '/dashboard/code-generator', icon: Code, label: 'Code Generator' },
  { href: '/dashboard/audio-explanations', icon: Mic, label: 'Audio Explanations' },
  { href: '/dashboard/quizzes', icon: ListChecks, label: 'Adaptive Quizzes' },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            onClick={() => router.push(item.href)}
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
