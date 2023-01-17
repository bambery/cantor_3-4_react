import React from 'react'
import PropTypes from 'prop-types'
import Interval from '../models/interval'
import FracDisplay from './FracDisplay'

const IntervalDisplay = ({ interval }) => {
    return(
        <div className='interval-display'>
            <div className='parens-left'></div>
            <FracDisplay frac={interval.left.reduce()}/>
            ,
            <FracDisplay frac={interval.right.reduce()}/>
            <span className='parens-right'></span>
        </div>
    )
}

IntervalDisplay.propTypes = {
    interval: PropTypes.instanceOf(Interval)
}

export default IntervalDisplay
