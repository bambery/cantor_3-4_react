import React from 'react'
import PropTypes from 'prop-types'
import Fraction from '../models/fraction'

const FracDisplay = ({ frac }) => {
    return(
        <span className='frac-display'>
            <span>{frac.num}</span>
            <span className='frac-line'>
            </span>
            <span>{frac.den}</span>
        </span>
    )
}

FracDisplay.propTypes = {
    frac: PropTypes.instanceOf(Fraction)
}

export default FracDisplay
/*
<div>a <span style="display:inline-flex;flex-direction:column;vertical-align:middle;">
<span>1</span>
<span style="border-top:1px solid">2</span>
</span> b
</div>
*/
