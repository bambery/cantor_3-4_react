import React from 'react'
import PropTypes from 'prop-types'
import styles from './FracDisplay.module.css'

function FracDisplay({ frac }) {
    return(
        <span className={styles.fracDisplay}>
            <span>{frac.num}</span>
            <span className={styles.fracLine}>
            </span>
            <span>{frac.den}</span>
        </span>
    )
}

FracDisplay.propTypes = {
    frac: PropTypes.object.isRequired
}

export default FracDisplay
