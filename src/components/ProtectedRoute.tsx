import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '@/contexts/FirebaseContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useFirebase();

  // If user is not authenticated, redirect to auth dashboard
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
