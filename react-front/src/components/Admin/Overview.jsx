import React, { useEffect } from 'react'

const Admin = () => {
    useEffect(() => {
        document.title = 'Overview';
    }, [])
    return (
        <div>
            <h1>Admin page</h1>
        </div>
    )
}

export default Admin
