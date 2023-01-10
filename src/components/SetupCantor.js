import React from 'react'
import SetupStep from './SetupStep'
import PropTypes from 'prop-types'
import { formInputValidation } from '../shared/utils'

const SetupCantor = ({ numSegments, toRemove, numIter, handleNumSegmentsChange, handleToRemoveChange, handleNumIterChange, handleLoseFocus, formErrors }) => {

    /* eslint-disable */
    const allInstructions = {
        'numSegments': 'How many segments should the line be divided into?',
        'toRemove': 'Enter the numbers of the segments you would like to remove',
        'numIter': 'How many iterations would you like to run?\n(Numberline will be be hidden when too cluttered)'
    }
    /* eslint-enable */


    return(
        <div className='setup-cantor-container'>
            <div className='setup-cantor'>
                <SetupStep
                    instructions={allInstructions['numSegments']}
                    stepName="Step 1"
                    name={'numSegments'}
                    inputState={numSegments}
                    handleInputChange={handleNumSegmentsChange}
                    handleLoseFocus={handleLoseFocus}
                />
                <SetupStep
                    instructions={allInstructions['toRemove']}
                    stepName="Step 2"
                    name={'toRemove'}
                    inputState={toRemove}
                    handleInputChange={handleToRemoveChange}
                    handleLoseFocus={handleLoseFocus}
                />
                <SetupStep
                    instructions={allInstructions['numIter']}
                    stepName="Step 3"
                    name={'numIter'}
                    inputState={numIter}
                    handleInputChange={handleNumIterChange}
                    handleLoseFocus={handleLoseFocus}
                />
            </div>
        </div>
    )
}

SetupCantor.propTypes = {
    numSegments: formInputValidation,
    toRemove: formInputValidation,
    numIter: formInputValidation,
    handleNumSegmentsChange: PropTypes.func.isRequired,
    handleToRemoveChange: PropTypes.func.isRequired,
    handleNumIterChange: PropTypes.func.isRequired,
    handleLoseFocus: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired
}

export default SetupCantor
