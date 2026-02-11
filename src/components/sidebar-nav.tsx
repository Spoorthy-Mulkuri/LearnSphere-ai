'use client';

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import {
  Book,
  BrainCircuit,
  Code,
  LayoutDashboard,
  ListChecks,
  Mic,
  Presentation,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/learning-path', icon: Book, label: 'Learning Path' },
  { href: '/dashboard/concept-explainer', icon: BrainCircuit, label: 'Concept Explainer' },
  { href: '/dashboard/code-generator', icon: Code, label: 'Code Generator' },
  { href: '/dashboard/visual-aids', icon: Presentation, label: 'Visual Aids' },
  { href: '/dashboard/audio-explanations', icon: Mic, label: 'Audio Explanations' },
  { href: '/dashboard/progress-tracking', icon: ListChecks, label: 'Progress' },
  { href: '/dashboard/quizzes', icon: ListChecks, label: 'Adaptive Quizzes' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            href={item.href}
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
