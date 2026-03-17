export type Role = 'super_admin' | 'school_admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  class?: string;
  section?: string;
  rollNo?: string;
  phone?: string;
  subject?: string;
}

export interface Parent {
  name: string;
  phone: string;
  email: string;
  relation: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description: string;
  teacherName: string;
  class?: string;
  section?: string;
  submittedCount?: number;
  totalStudents?: number;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  subject?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'holiday' | 'cultural' | 'sports' | 'meeting';
  description: string;
}

export interface FeeRecord {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface ScoreRecord {
  subject: string;
  marks: number;
  total: number;
  grade: string;
  exam: string;
  term?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: 'trophy' | 'star' | 'award';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TimetableSlot {
  day: string;
  periods: {
    time: string;
    subject: string;
    teacher: string;
    room: string;
    type?: 'lecture' | 'lab' | 'break' | 'lunch' | 'free';
  }[];
}

export interface TeacherScheduleSlot {
  day: string;
  periods: {
    time: string;
    subject: string;
    class: string;
    room: string;
    type?: 'lecture' | 'lab' | 'break' | 'lunch' | 'free';
  }[];
}

export const mockUsers: User[] = [
  { id: '1', name: 'Dr. Rajesh Kumar', email: 'admin@school.com', role: 'super_admin' },
  { id: '2', name: 'Mrs. Priya Sharma', email: 'priya@school.com', role: 'school_admin' },
  { id: '3', name: 'Mr. Arun Verma', email: 'arun@school.com', role: 'teacher', subject: 'Mathematics' },
  { id: '4', name: 'Ms. Deepa Nair', email: 'deepa@school.com', role: 'teacher', subject: 'Science' },
  { id: '8', name: 'Mrs. Kavita Joshi', email: 'kavita@school.com', role: 'teacher', subject: 'English' },
  { id: '9', name: 'Mr. Suresh Iyer', email: 'suresh@school.com', role: 'teacher', subject: 'History' },
  { id: '10', name: 'Mrs. Sunita Devi', email: 'sunita@school.com', role: 'teacher', subject: 'Hindi' },
  { id: '11', name: 'Mr. Ramesh Gupta', email: 'ramesh@school.com', role: 'teacher', subject: 'Computer Science' },
  { id: '5', name: 'Arjun Mehta', email: 'arjun@school.com', role: 'student', class: '10', section: 'A', rollNo: '14' },
  { id: '6', name: 'Sneha Patel', email: 'sneha@school.com', role: 'student', class: '10', section: 'A', rollNo: '22' },
  { id: '7', name: 'Rohan Singh', email: 'rohan@school.com', role: 'student', class: '10', section: 'B', rollNo: '08' },
  { id: '12', name: 'Priya Verma', email: 'priyav@school.com', role: 'student', class: '10', section: 'A', rollNo: '18' },
  { id: '13', name: 'Amit Kumar', email: 'amit@school.com', role: 'student', class: '10', section: 'B', rollNo: '03' },
  { id: '14', name: 'Neha Gupta', email: 'neha@school.com', role: 'student', class: '9', section: 'A', rollNo: '11' },
  { id: '15', name: 'Vikram Rathore', email: 'vikram@school.com', role: 'student', class: '9', section: 'B', rollNo: '25' },
  { id: '16', name: 'Anjali Mishra', email: 'anjali@school.com', role: 'student', class: '9', section: 'A', rollNo: '05' },
  { id: '17', name: 'Rahul Dev', email: 'rahul@school.com', role: 'student', class: '9', section: 'B', rollNo: '12' },
  { id: '18', name: 'Sanya Mirza', email: 'sanya@school.com', role: 'student', class: '9', section: 'B', rollNo: '19' },
  { id: '19', name: 'Karan Johar', email: 'karan@school.com', role: 'student', class: '6', section: 'A', rollNo: '01' },
  { id: '20', name: 'Pooja Hegde', email: 'pooja@school.com', role: 'student', class: '6', section: 'A', rollNo: '08' },
  { id: '21', name: 'Ravi Teja', email: 'ravi@school.com', role: 'student', class: '6', section: 'A', rollNo: '15' },
];

export const mockParent: Parent = {
  name: 'Mr. Vikram Mehta',
  phone: '+91 98765 11111',
  email: 'vikram.mehta@email.com',
  relation: 'Father',
};

export const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'Quadratic Equations Worksheet', subject: 'Mathematics', dueDate: '2026-03-20', status: 'pending', description: 'Complete exercises 1-20 on page 45.', teacherName: 'Mr. Arun Verma', class: '10', section: 'A', submittedCount: 15, totalStudents: 35 },
  { id: 'a2', title: 'Periodic Table Report', subject: 'Science', dueDate: '2026-03-15', status: 'submitted', description: 'Write a 2-page report on noble gases.', teacherName: 'Ms. Deepa Nair', class: '10', section: 'A', submittedCount: 35, totalStudents: 35 },
  { id: 'a3', title: 'Essay: My Favorite Season', subject: 'English', dueDate: '2026-03-10', status: 'graded', grade: 'A+', description: '500 words on your favorite season.', teacherName: 'Mrs. Kavita Joshi', class: '10', section: 'A', submittedCount: 35, totalStudents: 35 },
  { id: 'a4', title: 'History Chapter 5 Questions', subject: 'History', dueDate: '2026-03-22', status: 'pending', description: 'Answer questions at the end of Chapter 5.', teacherName: 'Mr. Suresh Iyer', class: '10', section: 'B', submittedCount: 5, totalStudents: 32 },
  { id: 'a5', title: 'Lab Experiment: Acids & Bases', subject: 'Chemistry', dueDate: '2026-03-12', status: 'graded', grade: 'A', description: 'Lab report from Tuesday.', teacherName: 'Ms. Deepa Nair', class: '10', section: 'A', submittedCount: 35, totalStudents: 35 },
  { id: 'a6', title: 'Hindi Poetry Analysis', subject: 'Hindi', dueDate: '2026-03-25', status: 'pending', description: 'Analyze the poem Kabir Ke Dohe.', teacherName: 'Mrs. Sunita Devi', class: '9', section: 'A', submittedCount: 0, totalStudents: 30 },
  { id: 'a7', title: 'Trigonometry Practice Set', subject: 'Mathematics', dueDate: '2026-03-21', status: 'pending', description: 'Solve the provided worksheet.', teacherName: 'Mr. Arun Verma', class: '10', section: 'B', submittedCount: 10, totalStudents: 32 },
  { id: 'a8', title: 'Python Programming Assignment', subject: 'Computer Science', dueDate: '2026-03-26', status: 'pending', description: 'Write a program to calculate factorial.', teacherName: 'Mr. Ramesh Gupta', class: '10', section: 'A', submittedCount: 2, totalStudents: 35 },
];

export const mockAttendance: AttendanceRecord[] = [
  { date: '2026-03-07', status: 'present' },
  { date: '2026-03-06', status: 'present' },
  { date: '2026-03-05', status: 'late' },
  { date: '2026-03-04', status: 'present' },
  { date: '2026-03-03', status: 'absent' },
  { date: '2026-03-02', status: 'present' },
  { date: '2026-02-28', status: 'present' },
  { date: '2026-02-27', status: 'present' },
  { date: '2026-02-26', status: 'late' },
  { date: '2026-02-25', status: 'present' },
  { date: '2026-02-24', status: 'present' },
  { date: '2026-02-23', status: 'absent' },
  { date: '2026-02-21', status: 'present' },
  { date: '2026-02-20', status: 'present' },
  { date: '2026-02-19', status: 'present' },
];

export const mockEvents: Event[] = [
  { id: 'e1', title: 'Mid-Term Examinations', date: '2026-03-20', time: '-', type: 'exam', description: 'All classes mid-term exams begin.' },
  { id: 'e2', title: 'Annual Sports Day', date: '2026-03-25', time: '08:00 AM', type: 'sports', description: 'Track and field events at the main ground.' },
  { id: 'e3', title: 'Holi Celebration', date: '2026-03-14', time: '10:00 AM', type: 'cultural', description: 'Festival of colors celebration in the courtyard.' },
  { id: 'e4', title: 'Parent-Teacher Meeting', date: '2026-03-28', time: '09:00 AM', type: 'meeting', description: 'Discuss mid-term progress.' },
  { id: 'e5', title: 'Good Friday Holiday', date: '2026-04-03', time: '-', type: 'holiday', description: 'School closed.' },
  { id: 'e6', title: 'Science Exhibition', date: '2026-04-10', time: '09:00 AM', type: 'cultural', description: 'Annual science fair.' },
];

export const mockFees: FeeRecord[] = [
  { id: 'f1', type: 'Tuition Fee - Q1', amount: 15000, dueDate: '2026-01-15', status: 'paid', paidDate: '2026-01-12' },
  { id: 'f2', type: 'Tuition Fee - Q2', amount: 15000, dueDate: '2026-04-15', status: 'pending' },
  { id: 'f3', type: 'Lab Fee', amount: 3000, dueDate: '2026-02-01', status: 'paid', paidDate: '2026-01-30' },
  { id: 'f4', type: 'Library Fee', amount: 1500, dueDate: '2026-02-15', status: 'paid', paidDate: '2026-02-14' },
  { id: 'f5', type: 'Sports Fee', amount: 2000, dueDate: '2026-03-01', status: 'overdue' },
  { id: 'f6', type: 'Transport Fee - Q1', amount: 5000, dueDate: '2026-01-10', status: 'paid', paidDate: '2026-01-08' },
];

export const mockMessages: Message[] = [
  { id: 'm1', senderId: '3', senderName: 'Mr. Arun Verma', receiverId: '5', text: 'Arjun, please submit your math assignment by tomorrow.', timestamp: '2026-03-13T10:30:00Z', read: true },
  { id: 'm2', senderId: '5', senderName: 'Arjun Mehta', receiverId: '3', text: 'Yes sir, I am almost done with it.', timestamp: '2026-03-13T10:45:00Z', read: true },
  { id: 'm3', senderId: '3', senderName: 'Mr. Arun Verma', receiverId: '5', text: 'Great, let me know if you need help with question 5.', timestamp: '2026-03-13T11:00:00Z', read: false },
  { id: 'm4', senderId: '4', senderName: 'Ms. Deepa Nair', receiverId: '5', text: 'Your science project was excellent!', timestamp: '2026-03-12T14:20:00Z', read: true },
  { id: 'm5', senderId: '5', senderName: 'Arjun Mehta', receiverId: '4', text: 'Thank you ma\'am!', timestamp: '2026-03-12T15:00:00Z', read: true },
];

export const mockScores: ScoreRecord[] = [
  { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'Science', marks: 88, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'English', marks: 95, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'Hindi', marks: 78, total: 100, grade: 'B+', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'History', marks: 82, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'Geography', marks: 85, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'Computer Science', marks: 96, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 1' },
  { subject: 'Physical Education', marks: 90, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 1' },
  
  { subject: 'Mathematics', marks: 89, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'Science', marks: 91, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'English', marks: 93, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'Hindi', marks: 80, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'History', marks: 85, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'Geography', marks: 88, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'Computer Science', marks: 98, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 2' },
  { subject: 'Physical Education', marks: 92, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 2' },

  { subject: 'Mathematics', marks: 95, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'Science', marks: 94, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'English', marks: 96, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'Hindi', marks: 85, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'History', marks: 89, total: 100, grade: 'A', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'Geography', marks: 90, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'Computer Science', marks: 99, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
  { subject: 'Physical Education', marks: 95, total: 100, grade: 'A+', exam: 'Final Exam', term: 'Term 3' },
];

export const mockAchievements: Achievement[] = [
  { id: 'ac1', title: 'Science Olympiad - Gold', description: 'Secured 1st rank in state level science olympiad.', date: '2026-02-15', icon: 'trophy' },
  { id: 'ac2', title: 'Best Speaker Award', description: 'Inter-school debate competition winner.', date: '2026-01-20', icon: 'star' },
  { id: 'ac3', title: '100% Attendance - Jan', description: 'Perfect attendance for the month of January.', date: '2026-01-31', icon: 'award' },
];

export const mockNotices: Notice[] = [
  { id: 'n1', title: 'Mid-Term Exam Schedule Released', content: 'The schedule for the upcoming mid-term exams has been published on the portal.', date: '2026-03-10', priority: 'high' },
  { id: 'n2', title: 'Library Books Return', content: 'All students must return issued library books before the exams begin.', date: '2026-03-12', priority: 'medium' },
  { id: 'n3', title: 'Uniform Code Reminder', content: 'Students are reminded to adhere strictly to the winter uniform code until March end.', date: '2026-03-08', priority: 'low' },
  { id: 'n4', title: 'Sports Day Registration', content: 'Last date to register for Annual Sports Day events is March 18.', date: '2026-03-11', priority: 'medium' },
];

export const mockTimetable: TimetableSlot[] = [
  { day: 'Monday', periods: [
    { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Room 301', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'History', teacher: 'Mr. Suresh Iyer', room: 'Room 301', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mr. Ramesh Gupta', room: 'CS Lab', type: 'lab' },
    { time: '12:00 - 12:45', subject: 'Lunch', teacher: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'Room 301', type: 'lecture' },
    { time: '13:30 - 14:15', subject: 'Physical Education', teacher: 'Mr. Rajesh', room: 'Ground', type: 'lecture' },
  ]},
  { day: 'Tuesday', periods: [
    { time: '08:00 - 08:45', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Science Lab', type: 'lab' },
    { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Geography', teacher: 'Mr. Suresh Iyer', room: 'Room 301', type: 'lecture' },
    { time: '12:00 - 12:45', subject: 'Lunch', teacher: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Computer Science', teacher: 'Mr. Ramesh Gupta', room: 'Room 301', type: 'lecture' },
    { time: '13:30 - 14:15', subject: 'Art', teacher: 'Ms. Shilpa', room: 'Art Room', type: 'lecture' },
  ]},
  { day: 'Wednesday', periods: [
    { time: '08:00 - 08:45', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'History', teacher: 'Mr. Suresh Iyer', room: 'Room 301', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Room 301', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'Room 301', type: 'lecture' },
    { time: '12:00 - 12:45', subject: 'Lunch', teacher: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Physical Education', teacher: 'Mr. Rajesh', room: 'Ground', type: 'lecture' },
    { time: '13:30 - 14:15', subject: 'Library', teacher: 'Mr. Sharma', room: 'Library', type: 'lecture' },
  ]},
  { day: 'Thursday', periods: [
    { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'Computer Science', teacher: 'Mr. Ramesh Gupta', room: 'CS Lab', type: 'lab' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Geography', teacher: 'Mr. Suresh Iyer', room: 'Room 301', type: 'lecture' },
    { time: '12:00 - 12:45', subject: 'Lunch', teacher: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'Room 301', type: 'lecture' },
    { time: '13:30 - 14:15', subject: 'Music', teacher: 'Mr. Kumar', room: 'Music Room', type: 'lecture' },
  ]},
  { day: 'Friday', periods: [
    { time: '08:00 - 08:45', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'History', teacher: 'Mr. Suresh Iyer', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'Room 301', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '12:00 - 12:45', subject: 'Lunch', teacher: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Computer Science', teacher: 'Mr. Ramesh Gupta', room: 'Room 301', type: 'lecture' },
    { time: '13:30 - 14:15', subject: 'Physical Education', teacher: 'Mr. Rajesh', room: 'Ground', type: 'lecture' },
  ]},
  { day: 'Saturday', periods: [
    { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mr. Arun Verma', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'Science', teacher: 'Ms. Deepa Nair', room: 'Room 301', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'English', teacher: 'Mrs. Kavita Joshi', room: 'Room 301', type: 'lecture' },
    { time: '10:30 - 11:15', subject: 'Extra Curricular', teacher: 'Various', room: 'Activity Hall', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Extra Curricular', teacher: 'Various', room: 'Activity Hall', type: 'lecture' },
  ]}
];

export const mockTeacherSchedule: TeacherScheduleSlot[] = [
  { day: 'Monday', periods: [
    { time: '08:00 - 08:45', subject: 'Mathematics', class: '10-A', room: 'Room 301', type: 'lecture' },
    { time: '08:45 - 09:30', subject: 'Mathematics', class: '10-B', room: 'Room 302', type: 'lecture' },
    { time: '09:30 - 09:45', subject: 'Break', class: '', room: '', type: 'break' },
    { time: '09:45 - 10:30', subject: 'Free Period', class: '', room: '', type: 'free' },
    { time: '10:30 - 11:15', subject: 'Mathematics', class: '9-A', room: 'Room 201', type: 'lecture' },
    { time: '11:15 - 12:00', subject: 'Mathematics', class: '9-B', room: 'Room 202', type: 'lecture' },
    { time: '12:00 - 12:45', subject: 'Lunch', class: '', room: '', type: 'lunch' },
    { time: '12:45 - 13:30', subject: 'Free Period', class: '', room: '', type: 'free' },
    { time: '13:30 - 14:15', subject: 'Remedial Math', class: '10-A', room: 'Room 301', type: 'lecture' },
  ]}
];

export const adminStats = {
  totalStudents: 1247,
  totalTeachers: 68,
  totalClasses: 42,
  attendanceRate: 94.2,
  feeCollection: 87.5,
  activeEvents: 4,
};

export const teacherStats = {
  totalClasses: 6,
  totalStudents: 245,
  pendingAssignments: 12,
  upcomingTests: 3,
};
