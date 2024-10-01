import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';  // استيراد AuthProvider
import Navbar from './Navbar';  // استيراد Navbar

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />  {/* إضافة شريط التنقل */}
        <Routes>
          {/* عند زيارة الصفحة الرئيسية '/' يتم توجيه المستخدم إلى صفحة تسجيل الدخول */}
          <Route path="/" element={<Navigate to="/login" />} />  

          {/* مسار صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />

          {/* مسار الصفحة الرئيسية، محمية بواسطة ProtectedRoute */}
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

          {/* مسار صفحة البروفايل، محمية بواسطة ProtectedRoute */}
          <Route path="/users/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
