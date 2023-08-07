import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../components/context/session.context';

const ProtectedRoutes = ({ requiredRole, children }) => {
    const { session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{session.role === requiredRole ? children : <Navigate to="/401" />}</>;
};

export default ProtectedRoutes
