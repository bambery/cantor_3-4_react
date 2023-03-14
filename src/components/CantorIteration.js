import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import IntervalCollection from '../models/interval_collection'
import Numberline from './Numberline'
import CantorTable from './CantorTable'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import styles from './CantorIteration.module.css'

function CantorIteration({ intCol, index }) {
    const toggleDefault = index === 0 ? true : false
    const [showDetails, setShowDetails] = useState(toggleDefault)

    function toggleDetails() {
        setShowDetails(!showDetails)
    }

    const displayToggle = () => {
        return (
            <span className='caretToggle'>
                {showDetails
                    ? <AiFillCaretDown/>
                    : <AiFillCaretRight/>
                }
            </span>
        )
    }

    const cantorTable = (kind) => {
        return (
            <div className={styles[`cantorResult${kind}s`]}>
                { kind === 'Segment'
                    ? <CantorTable intervalArr={intCol.intervals} kind='segment' totLen={intCol.len}/>
                    : <CantorTable intervalArr={intCol.gaps} kind='gap' totLen={intCol.gapLen} />
                }
            </div>
        )
    }


    return(
        <div className={styles.cantorResultIteration}>
            <div className={styles.cantorResultNumberline}>
                <Numberline intCol={intCol} isDemo={false}/>
            </div>
            <div className={styles.cantorResultIterationName} onClick={toggleDetails}>
                {displayToggle()}
                Iteration {index + 1}
            </div>
            {showDetails && cantorTable('Segment')}
            {showDetails && cantorTable('Gap')}
        </div>
    )
}

CantorIteration.propTypes = {
    intCol: PropTypes.instanceOf(IntervalCollection).isRequired,
    index: PropTypes.number.isRequired
}

export default CantorIteration

