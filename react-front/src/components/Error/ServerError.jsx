import React, { useContext } from 'react'
import { ErrorContext } from '../context/error.context'

const DashboardError = () => {
    const { hasError } = useContext(ErrorContext)
    if (hasError) {
        const { statusCode, title, text } = hasError
        return (
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="container text-center">
                        <p className="display-1 text-muted mb-0">{statusCode}</p>
                        <p className="fs-2 mt-0">{title}</p>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardError
