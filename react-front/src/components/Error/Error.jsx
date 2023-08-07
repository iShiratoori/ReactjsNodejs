import React, { useContext } from 'react'
import { ErrorContext } from '../context/error.context'

const Error = () => {
    const { hasError } = useContext(ErrorContext)
    return (
        <div>
            <h1>This Router Error Handler</h1>
            <p>{hasError && hasError.message}</p>
        </div>
    )
}

export default Error
