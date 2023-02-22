import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import Modal from './Modal'

const SetupStep = (props) => {
    const { stepName, name, inputState, handleInputChange, handleLoseFocus, formError, anyErrors, showResults } = props

    const [showModal, setShowModal] = useState(false)

    const modalWatcherOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }

    const modalCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting){
                const diff = Math.ceil(entry.boundingClientRect.width - entry.intersectionRect.width)
                entry.target.style.left = entry.target.style.left - (diff + 20) + 'px'
                console.log(`is intersecting: ${entry.isIntersecting}`)
            }
            entry.target.style.visibility = "visible"
        })
    }

    const modalWatcher = new IntersectionObserver(modalCallback, modalWatcherOptions)

    useEffect(() => {
        const modalID = document.querySelector(`#modal-${name}`)
        if(showModal){
            modalWatcher.observe(modalID)
        } else if (modalID) {
            modalWatcher.unobserve(modalID)
        }
    }, [showModal])

    const allInstructions = {
        'numSegments': 'How many segments should the line be divided into?',
        'toRemove': 'Which segments should be removed?\n(comma-separated list)',
        'numIter': 'How many iterations would you like to run?'
    }

    const allModals = {
        'numSegments': {
            title: 'Number of Segments',
            message: 'Enter a number between 3 and 30 and the line segment in the black box below will reflect your choice. Each segment will be numbered left to right.' },
        'toRemove': {
            title: 'Segments to Remove',
            message: 'Using the numbered line segment in the box below, select the number of the sections you wish to remove for each iteration of Cantor.' },
        'numIter': {
            title: 'Number of Iterations',
            message: 'This number chooses how many times to run the Cantor process on a line segment. If you select 3, the page will display 3 numberlines, each one removing more segments from the previous.' }
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

    const stepHeader = () => {
        return(
            <div className='title-flex'>
                <div className='title'>
                    {stepName}
                </div>
                <IconContext.Provider value={{ className:'title-help-icon' }}>
                    <div>
                        <span onClick={ () => setShowModal(true)}>
                            <AiOutlineQuestionCircle />
                        </span>
                        { showModal && <Modal setShowModal={setShowModal} name={name} instructions={allModals[name]}/> }
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
