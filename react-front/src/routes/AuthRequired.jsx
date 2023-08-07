import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../components/context/session.context';

const ProtectedRoutes = ({ children }) => {
    const { session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{session ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes
