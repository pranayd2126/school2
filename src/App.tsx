import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { Layout as AdminLayout } from './components/Layout';
import { TeacherLayout } from './components/TeacherLayout';
import { StudentLayout } from './components/StudentLayout';

// Public Pages
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

// Dashboards
import { AdminDashboard } from './pages/AdminDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { StudentHome } from './pages/StudentHome';

// Admin Pages
import { AdminTeachers } from './pages/AdminTeachers';
import { AdminStudents } from './pages/AdminStudents';
import { AdminFees } from './pages/AdminFees';
import { AdminEvents } from './pages/AdminEvents';
import { AdminReports } from './pages/AdminReports';
import { AdminSettings } from './pages/AdminSettings';

// Teacher Pages
import { TeacherStudents } from './pages/TeacherStudents';
import { TeacherMyClass } from './pages/TeacherMyClass';
import { TeacherClassResults } from './pages/TeacherClassResults';
import { TeacherAttendance } from './pages/TeacherAttendance';
import { TeacherAssignments } from './pages/TeacherAssignments';
import { TeacherSchedule } from './pages/TeacherSchedule';
import { TeacherMessages } from './pages/TeacherMessages';
import { TeacherProfile } from './pages/TeacherProfile';

// Student Pages
import { StudentProfile } from './pages/StudentProfile';
import { StudentTimetable } from './pages/StudentTimetable';
import { StudentAssignments } from './pages/StudentAssignments';
import { StudentAttendance } from './pages/StudentAttendance';
import { StudentScorecard } from './pages/StudentScorecard';
import { StudentEvents } from './pages/StudentEvents';
import { StudentFees } from './pages/StudentFees';
import { StudentMessages } from './pages/StudentMessages';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['super_admin', 'school_admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Teacher Routes */}
          <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="my-class" element={<TeacherMyClass />} />
              <Route path="my-class/results" element={<TeacherClassResults />} />
              <Route path="students" element={<TeacherStudents />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="assignments" element={<TeacherAssignments />} />
              <Route path="schedule" element={<TeacherSchedule />} />
              <Route path="messages" element={<TeacherMessages />} />
              <Route path="profile" element={<TeacherProfile />} />
            </Route>
          </Route>

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="scorecard" element={<StudentScorecard />} />
              <Route path="events" element={<StudentEvents />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="messages" element={<StudentMessages />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  );
}
