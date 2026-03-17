import React from 'react';
import { LayoutDashboard, Users, ClipboardCheck, FileText, Calendar, MessageCircle, User, GraduationCap, Award } from 'lucide-react';
import { DashboardLayout, NavItem } from './DashboardLayout';

const teacherNavItems: NavItem[] = [
  { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/teacher/my-class', icon: GraduationCap, label: 'My Class' },
  { to: '/teacher/students', icon: Users, label: 'All Students' },
  { to: '/teacher/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { to: '/teacher/my-class/results', icon: Award, label: 'Results' },
  { to: '/teacher/assignments', icon: FileText, label: 'Assignments' },
  { to: '/teacher/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/teacher/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/teacher/profile', icon: User, label: 'My Profile' },
];

export function TeacherLayout() {
  return <DashboardLayout navItems={teacherNavItems} title="Teacher Portal" />;
}
