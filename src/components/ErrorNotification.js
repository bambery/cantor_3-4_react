import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ error }) => {
    return (
        <div role="alert" className='notification'>
            <pre>{error.message}</pre>
        </div>
    )
}

ErrorNotification.propTypes = {
    error: PropTypes.object
}

export default ErrorNotification
