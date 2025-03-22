import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase.utils';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-t-transparent border-emerald-400 rounded-full animate-spin"></div>;
        </div>
      );
    }
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;