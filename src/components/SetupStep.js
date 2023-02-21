import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import Modal from './Modal'

const SetupStep = (props) => {
    const { stepName, name, inputState, handleInputChange, handleLoseFocus, formError, anyErrors, showResults } = props

    const [showModal, setShowModal] = useState(false)

    const allInstructions = {
        'numSegments': 'How many segments should the line be divided into?',
        'toRemove': 'Which segments should be removed?\n(comma-separated list)',
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

    const getId = () => {
        return(`help-${stepName.toLowerCase().replace(' ', '-')}`)
    }

    const stepHeader = () => {
        return(
            <div className='title-flex'>
                <div className='title'>
                    {stepName}
                </div>
                <IconContext.Provider value={{ className:'title-help-icon' }}>
                    <div>
                        <span onClick={ () => setShowModal(true)} id={getId()}>
                            <AiOutlineQuestionCircle />
                        </span>
                        { showModal && <Modal setShowModal={setShowModal} id={getId()}/> }
                    </div>
                </IconContext.Provider>
            </div>
        )
    }

    return(
        <div className={`setup-step ${name==='toRemove' && anyErrors('numSegments')? 'disable-item' : ''}`}>
            {stepHeader()}
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

//<AiOutlineQuestionCircle value={{ size:getComputedStyle(document.body).getPropertyValue('--step-title-font-size') }}/>
