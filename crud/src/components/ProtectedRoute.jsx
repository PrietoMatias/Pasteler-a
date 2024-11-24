import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  if (loading) {
    return <div>Loading...</div>; 
  }

  return children;
};

export default ProtectedRoute;
