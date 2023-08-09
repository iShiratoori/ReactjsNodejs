import { Navigate } from 'react-router-dom'
import { useSession } from '../components/context/session.context';

const ProtectedRoutes = ({ requiredRole, children }) => {
    const { session } = useSession();

    return <>{session.role === requiredRole ? children : <Navigate to="/401" />}</>;
};

export default ProtectedRoutes
