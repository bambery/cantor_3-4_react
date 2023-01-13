import React from 'react'
import PropTypes from 'prop-types'
//import Cantor from '../models/cantor'
import IntervalCollection from '../models/interval_collection'
import Numberline from './Numberline'

const CantorIteration = ({ intCol, index }) => {
    return(
        <div className='cantor-results-iteration'>
            <div className='cantor-result-numberline'>
                <Numberline intCol={intCol} isDemo={false}/>
            </div>
            <div className='cantor-result-iteration-name'>
                Iteration {index + 1}
            </div>
        </div>
    )
}

CantorIteration.propTypes = {
    intCol: PropTypes.instanceOf(IntervalCollection).isRequired,
    index: PropTypes.number.isRequired
}

export default CantorIteration
