import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requireAuth = true, requireBreeder = false, requireAdmin = false }) {
  const { user, loading, isAuthenticated, isBreeder, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
      } else if (requireBreeder && !isBreeder) {
        router.push('/');
      } else if (requireAdmin && !isAdmin) {
        router.push('/');
      }
    }
  }, [loading, isAuthenticated, isBreeder, isAdmin, requireAuth, requireBreeder, requireAdmin]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div className="loader">Ładowanie...</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) return null;
  if (requireBreeder && !isBreeder) return null;
  if (requireAdmin && !isAdmin) return null;

  return children;
}
