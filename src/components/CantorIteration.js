import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import IntervalCollection from '../models/interval_collection'
import Numberline from './Numberline'
import CantorTable from './CantorTable'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const CantorIteration = ({ intCol, index }) => {
    const toggleDefault = index === 0 ? true : false
    const [showDetails, setShowDetails] = useState(toggleDefault)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const displayToggle = () => {
        return showDetails
            ? <AiFillCaretDown/>
            : <AiFillCaretRight/>
    }

    const cantorTable = (kind) => {
        return (
            kind === 'seg'
                ? <CantorTable intervalArr={intCol.intervals} kind='segment' totLen={intCol.len}/>
                : <CantorTable intervalArr={intCol.gaps} kind='gap' totLen={intCol.gapLen} />
        )
    }


    return(
        <IconContext.Provider value={{ color: getComputedStyle(document.body).getPropertyValue('--color-bluish') }}>
            <div className='cantor-result-iteration'>
                <div className='cantor-result-numberline'>
                    <Numberline intCol={intCol} isDemo={false}/>
                </div>
                <div className='cantor-result-iteration-name' onClick={toggleDetails}>
                    {displayToggle()}
                    Iteration {index + 1}
                </div>
                {showDetails && cantorTable('seg')}
                {showDetails && cantorTable('gap')}
            </div>
        </IconContext.Provider>
    )
}

CantorIteration.propTypes = {
    intCol: PropTypes.instanceOf(IntervalCollection).isRequired,
    index: PropTypes.number.isRequired
}

export default CantorIteration

