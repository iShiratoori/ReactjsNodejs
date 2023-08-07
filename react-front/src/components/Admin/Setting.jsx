import React from 'react'
import { useSession } from '../context/session.context'

const Setting = () => {
    const { session } = useSession()
    function getExpires() {
        const expires = new Date(session.exp * 1000);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        return expires.toLocaleTimeString('en-US', timeOptions);
    }
    return (
        <div>
            <div>Your Role: {session.role}</div>
            <div>Token: {session.token}</div>
            <div>Expires: <span className='text-red-500'>{getExpires()}</span></div>
        </div>
    )
}

export default Setting
