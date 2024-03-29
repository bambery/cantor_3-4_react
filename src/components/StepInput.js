import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import Modal from './Modal'
import styles from './StepInput.module.css'

function StepInput({ stepConfig, formErrors, showResults, validateFields }) {

    const [showModal, setShowModal] = useState(false)
    const { name, title, valueStr, handleChange, instructions, modal } = stepConfig

    useEffect(() => {
        const modalID = document.querySelector(`#modal-${name}`)
        if(showModal){
            modalWatcher.observe(modalID)
        } else if (modalID) {
            modalWatcher.unobserve(modalID)
        }
    }, [showModal])

    const modalWatcherOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }

    // if modal runs offscreen on the right, shift it
    function modalCallback(entries) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting){
                const diff = Math.ceil(entry.boundingClientRect.width - entry.intersectionRect.width)
                entry.target.style.left = entry.target.style.left - (diff + 20) + 'px'
            }
            entry.target.style.visibility = 'visible'
        })
    }

    const modalWatcher = new IntersectionObserver(modalCallback, modalWatcherOptions)

    function handleEnter(e) {
        const keycode = e.code || e.key
        if(keycode === 'Enter'){
            console.log('enter was hit')
            e.preventDefault()
            validateFields()
        } else {
            console.log('another key ws hit')
        }

    }

    function isResults() {
        if(showResults){
            let toDisplay = valueStr
            if(name === 'toRemove'){
                toDisplay = valueStr.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) ).sort( (a, b) => a-b).join(', ')
            }
            return(
                <div className='step-result'>
                    {toDisplay}
                </div>
            )
        } else {
            return(
                <input
                    value={valueStr}
                    autoComplete='false'
                    data-lpignore='true'
                    name={name}
                    onChange={handleChange}
                    onBlur={validateFields}
                    onKeyDown={handleEnter}
                    disabled={ name==='toRemove' && formErrors['numSegments'] }
                />
            )
        }
    }

    const stepHeader = () => {
        return(
            <div className={styles.titleFlex}>
                <div className={styles.title}>
                    {title}
                </div>
                <IconContext.Provider value={{ className: styles.titleHelpIcon }}>
                    <div>
                        <span onClick={ () => setShowModal(true)}>
                            <AiOutlineQuestionCircle />
                        </span>
                        { showModal && <Modal setShowModal={setShowModal} name={name} instructions={modal}/> }
                    </div>
                </IconContext.Provider>
            </div>
        )
    }

    return(
        <div className={`${styles.setupStep} ${name==='toRemove' && formErrors['numSegments']? 'disable-item' : ''}`}>
            {stepHeader()}
            <div className={styles.instructionBox}>
                <div className='instruction'>
                    { instructions }
                </div>
                <div className={styles.stepInput}>
                    {isResults()}
                </div>
                <div className={styles.stepError}>
                    {formErrors[name]}
                </div>
            </div>
        </div>
    )
}

StepInput.propTypes = {
    stepConfig:         PropTypes.object.isRequired,
    formErrors:         PropTypes.object.isRequired,
    showResults:        PropTypes.bool.isRequired,
    validateFields:     PropTypes.func.isRequired
}

export default StepInput
