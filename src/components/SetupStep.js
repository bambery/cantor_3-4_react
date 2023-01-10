import React from 'react'
import PropTypes from 'prop-types'

const SetupStep = (props) => {
    const { stepName, name, inputState, handleInputChange, handleLoseFocus, formError } = props

    const allInstructions = {
        'numSegments': 'How many segments should the line be divided into?',
        'toRemove': 'Which segments should be removed?',
        'numIter': 'How many iterations would you like to run?'
    }

    return(
        <div className='setup-step'>
            <div className='title'>
                {stepName}
            </div>
            <div className='instruction-box'>
                <div className='instruction'>
                    { allInstructions[name] }
                </div>
                <div className='step-input'>
                    <input
                        value={inputState}
                        name={name}
                        onChange={handleInputChange}
                        onBlur={handleLoseFocus}
                    />
                </div>
                <div className='step-error'>
                    {formError}
                </div>
            </div>
        </div>
    )
}

SetupStep.propTypes = {
    stepName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inputState: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleInputChange: PropTypes.func.isRequired,
    handleLoseFocus: PropTypes.func.isRequired,
    formError: PropTypes.string
}

export default SetupStep
