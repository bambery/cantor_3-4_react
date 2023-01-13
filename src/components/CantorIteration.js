import React from 'react'
import PropTypes from 'prop-types'
//import Cantor from '../models/cantor'
import IntervalCollection from '../models/interval_collection'
import Numberline from './Numberline'
import CantorTable from './CantorTable'

const CantorIteration = ({ intCol, index }) => {
    return(
        <div className='cantor-result-iteration'>
            <div className='cantor-result-numberline'>
                <Numberline intCol={intCol} isDemo={false}/>
            </div>
            <div className='cantor-result-iteration-name'>
                Iteration {index + 1}
            </div>
            <CantorTable intervalArr={intCol.intervals} kind='segment' totLen={intCol.len}/>
            <CantorTable intervalArr={intCol.gaps} kind='gap' totLen={intCol.gapLen}/>
        </div>
    )
}

CantorIteration.propTypes = {
    intCol: PropTypes.instanceOf(IntervalCollection).isRequired,
    index: PropTypes.number.isRequired
}

export default CantorIteration

