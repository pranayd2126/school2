import React from 'react';
import { Home, User, Clock, FileText, ClipboardCheck, BarChart3, Calendar, CreditCard, MessageCircle } from 'lucide-react';
import { DashboardLayout, NavItem } from './DashboardLayout';

const studentNavItems: NavItem[] = [
  { to: '/student', icon: Home, label: 'Dashboard' },
  { to: '/student/profile', icon: User, label: 'My Profile' },
  { to: '/student/timetable', icon: Clock, label: 'Timetable' },
  { to: '/student/assignments', icon: FileText, label: 'Assignments' },
  { to: '/student/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { to: '/student/scorecard', icon: BarChart3, label: 'Scorecard' },
  { to: '/student/events', icon: Calendar, label: 'Events' },
  { to: '/student/fees', icon: CreditCard, label: 'Fees' },
  { to: '/student/messages', icon: MessageCircle, label: 'Messages' },
];

export function StudentLayout() {
  return <DashboardLayout navItems={studentNavItems} title="Student Portal" />;
}
