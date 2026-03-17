import React from 'react';
import { LayoutDashboard, GraduationCap, Users, CreditCard, Calendar, FileText, Settings } from 'lucide-react';
import { DashboardLayout, NavItem } from './DashboardLayout';

const adminNavItems: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/teachers', icon: GraduationCap, label: 'Teachers' },
  { to: '/admin/students', icon: Users, label: 'Students' },
  { to: '/admin/fees', icon: CreditCard, label: 'Fee Management' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function Layout() {
  return <DashboardLayout navItems={adminNavItems} title="Admin Portal" />;
}
