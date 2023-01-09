import React from 'react'
import SetupStep from './SetupStep'
import PropTypes from 'prop-types'

const SetupCantor = (props) => {
    const { numSegments, handleNumSegmentsChange } = props

    /* eslint-disable */
    const allInstructions = [
        'How many segments should the line be divided into?',
        'Select below the segments you wish to remove each iteration, or enter segments numbers separated by comma here:',
        'How many iterations would you like to run?\n(Numberline will be be hidden when too cluttered)'
    ]
    /* eslint-enable */


    return(
        <div className='setup-cantor-container'>
            <div className='setup-cantor'>
                <SetupStep instructions={allInstructions[0]} stepName="Step 1" inputState={numSegments} handleInputChange={handleNumSegmentsChange}/>
                <SetupStep instructions={allInstructions[1]} stepName="Step 2"/>
                <SetupStep instructions={allInstructions[2]} stepName="Step 3"/>
            </div>
        </div>
    )
}

SetupCantor.propTypes = {
    numSegments: PropTypes.number.isRequired,
    handleNumSegmentsChange: PropTypes.func.isRequired
}

export default SetupCantor
