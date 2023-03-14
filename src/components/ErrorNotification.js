import React from 'react'
import PropTypes from 'prop-types'
import styles from './ErrorNotification.module.css'

function ErrorNotification({ error }) {
    return (
        <div role="alert" className={styles.notification}>
            <pre>{error.message}</pre>
        </div>
    )
}

ErrorNotification.propTypes = {
    error: PropTypes.object
}

export default ErrorNotification
