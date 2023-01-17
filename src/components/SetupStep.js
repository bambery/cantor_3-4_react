import React from 'react'
import PropTypes from 'prop-types'

const SetupStep = (props) => {
    const { stepName, name, inputState, handleInputChange, handleLoseFocus, formError, anyErrors, showResults } = props

    const allInstructions = {
        'numSegments': 'How many segments should the line be divided into?',
        'toRemove': 'Which segments should be removed?',
        'numIter': 'How many iterations would you like to run?'
    }

    let toDisplay = inputState

    const isResults = () => {
        if(showResults){
            if(name === 'toRemove'){
                toDisplay = inputState.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) ).sort( (a, b) => a-b).join(', ')
            }
            return(
                <div className='step-result'>
                    {toDisplay}
                </div>
            )
        } else {
            return(
                <input
                    value={inputState}
                    autoComplete='false'
                    data-lpignore='true'
                    name={name}
                    onChange={handleInputChange}
                    onBlur={handleLoseFocus}
                    disabled={ name==='toRemove' && anyErrors('numSegments') }
                />
            )
        }
    }

    return(
        <div className={`setup-step ${name==='toRemove' && anyErrors('numSegments')? 'disable-item' : ''}`}>
            <div className='title'>
                {stepName}
            </div>
            <div className='instruction-box'>
                <div className='instruction'>
                    { allInstructions[name] }
                </div>
                <div className='step-input'>
                    {isResults()}
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
    formError: PropTypes.string,
    showResults: PropTypes.bool.isRequired,
    anyErrors: PropTypes.func
}

export default SetupStep
