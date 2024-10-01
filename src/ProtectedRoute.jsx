import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();  // نستخدم useAuth للوصول إلى حالة المستخدم
  console.log('User status:', user);  // عرض حالة المستخدم في وحدة التحكم
  
  if (!user) {  // إذا لم يكن المستخدم مسجل الدخول، نقوم بتوجيهه إلى صفحة تسجيل الدخول
    return <Navigate to="/login" />;
  }

  return children;  // إذا كان المستخدم مسجل الدخول، نعرض المحتوى المحمي
};

export default ProtectedRoute;