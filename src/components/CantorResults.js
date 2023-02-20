import React from 'react'
import PropTypes from 'prop-types'
import Cantor from '../models/cantor'
import CantorIteration from './CantorIteration'

const CantorResults = ({ cantorSet }) => {
    return(
        <div className='cantor-results'>
            <hr className='horizontal-line'></hr>
            <div className='cantor-results-description'>
                Cantor-like Set of {cantorSet.numSegments} Segmented Intervals, Removing Segment{cantorSet.toRemove.length > 1 ? 's' : ''} {cantorSet.toRemove.join(', ')}
            </div>
            <div className='cantor-results'>
                {cantorSet.iterations.map( (iter, idx) => <CantorIteration key={idx} intCol={iter} index={idx}/>)}
            </div>
            <hr className='horizontal-line'></hr>
        </div>
    )
}

CantorResults.propTypes = {
    cantorSet: PropTypes.instanceOf(Cantor)
}

export default CantorResults
