import React from 'react'
import PropTypes from 'prop-types'
import SetupStep from './SetupStep'

const SetupCantor = ({ numSegmentsStr, toRemoveStr, numIterStr, handleNumSegmentsChange, handleToRemoveChange, handleNumIterChange, handleLoseFocus, formErrors }) => {

    return(
        <div className='setup-cantor'>
            <SetupStep
                stepName="Step 1"
                name={'numSegments'}
                inputState={numSegmentsStr}
                handleInputChange={handleNumSegmentsChange}
                handleLoseFocus={handleLoseFocus}
                formError={formErrors['numSegments']}
            />
            <SetupStep
                stepName="Step 2"
                name={'toRemove'}
                inputState={toRemoveStr}
                handleInputChange={handleToRemoveChange}
                handleLoseFocus={handleLoseFocus}
                formError={formErrors['toRemove']}
            />
            <SetupStep
                stepName="Step 3"
                name={'numIter'}
                inputState={numIterStr}
                handleInputChange={handleNumIterChange}
                handleLoseFocus={handleLoseFocus}
                formError={formErrors['numIter']}
            />
        </div>
    )
}

SetupCantor.propTypes = {
    numSegmentsStr: PropTypes.string,
    toRemoveStr: PropTypes.string,
    numIterStr: PropTypes.string,
    handleNumSegmentsChange: PropTypes.func.isRequired,
    handleToRemoveChange: PropTypes.func.isRequired,
    handleNumIterChange: PropTypes.func.isRequired,
    handleLoseFocus: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired
}

export default SetupCantor
