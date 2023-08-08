import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeToken, isExpired } from 'react-jwt';
import { LoginUser } from '../../server/server';

const SessionContext = createContext();
export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        const session_cookies = Cookies.get('session-token');
        if (session_cookies) {
            VerifyFunc(session_cookies)
        }
    }, []);

    function VerifyFunc(session) {
        const data = decodeToken(session);
        const isexp = isExpired(session);
        if (data && !isexp) {
            return setSession(data);
        }
        setSession(null);
    }

    const login = async (userData) => {
        try {
            const res = await LoginUser(userData, 'api/auth');
            Cookies.set('session-token', res.user.token);
            VerifyFunc(res.user.token)
            return true
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    };

    const logout = () => {
        setSession(null);
        Cookies.remove('session-token');
    };

    const sessionContextValue = {
        session,
        login,
        logout,
    };

    return (
        <SessionContext.Provider value={sessionContextValue}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
