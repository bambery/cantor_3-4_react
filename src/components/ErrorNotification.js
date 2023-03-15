import React from 'react'
import PropTypes from 'prop-types'
import styles from './ErrorNotification.module.css'

function ErrorNotification({ error }) {
    return (
        <div role="alert" className={styles.notification}>
            {error.message}
        </div>
    )
}

ErrorNotification.propTypes = {
    error: PropTypes.object
}

export default ErrorNotification
