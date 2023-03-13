import React from 'react'
import PropTypes from 'prop-types'
import Interval from '../models/interval'
import FracDisplay from './FracDisplay'
import styles from './IntervalDisplay.module.css'

function IntervalDisplay({ interval }) {
    return(
        <div className={styles.intervalDisplay}>
            <div className={styles.parensLeft }></div>
            <FracDisplay frac={interval.left.reduce()}/>
            ,
            <FracDisplay frac={interval.right.reduce()}/>
            <span className={styles.parensRight}></span>
        </div>
    )
}

IntervalDisplay.propTypes = {
    interval: PropTypes.instanceOf(Interval)
}

export default IntervalDisplay
