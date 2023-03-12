import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Cantor from '../models/cantor'
import CantorInputs from './CantorInputs'
import SetupStep from './SetupStep'
import Demo from './Demo'
import styles from './GenerateCantor.module.css'
import { stateDefaults } from '../shared/constants'

const GenerateCantor = ({ setNotification }) => {
    const [setup, setSetup] = useState({
        'numSegments':  stateDefaults['numSegments'],
        'toRemove':     stateDefaults['toRemove'],
        'numIter':      stateDefaults['numIter']
    })

    const [formErrors, setFormErrors] = useState({
        'numSegments':  null,
        'toRemove':     null,
        'numIter':      null
    })

    const [cantor, setCantor] = useState( new Cantor(stateDefaults.numSegments, stateDefaults.toRemove, stateDefaults.numIter) )
    const [displayResults, setDisplayResults] = useState(false)
    const [disableCanvas, setDisableCanvas] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect( () => {
        if(loading) {
            try {
                let newCantor = new Cantor(setup.numSegments, setup.toRemove, setup.numIter)
                setCantor(newCantor)
                setDisplayResults(true)
                setLoading(false)
            } catch(e) {
                setNotification(e)
                setCantor( new Cantor(setup.numSegments, setup.toRemove, 1) )
                setLoading(false)
            }
        }
    }, [ loading ])

    const anyErrors = (specific=null) => {
        if(specific){
            return !!formErrors[specific]
        } else {
            return Object.values(formErrors).reduce((acc, curr) => acc || !!curr, false)
        }
    }

    const handleCantorizeClick = (event) => {
        event.preventDefault()
        setNotification()
        if(anyErrors()){
            return
        }

        setLoading(true)
    }

    const renderDemo = () => {
        return(
            <Demo
                cantorIter = {cantor.iterations[0]}
                isDemo={true}
                loading={loading}
                disableCanvas={disableCanvas}
                disableSubmit={disableSubmit}
                handleCantorizeClick={handleCantorizeClick}
                toRemove={setup.toRemove}
            />
        )
    }

    const renderResults = () => {
            /*
            <Results

            >
            //  show top button
            //  show numberline
            //  show bottom
            */
        typeof Function.prototype === "function"
    }

    return(
        <form autoComplete='off' onSubmit={handleCantorizeClick}>
            <CantorInputs
                setup={setup}
                setSetup={setSetup}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                disableSubmit={disableSubmit}
                setDisableSubmit={setDisableSubmit}
                displayResults={displayResults}
            />
            { !displayResults && renderDemo() }
            {// displayResults && renderResults()
            }
        </form>
    )
}

GenerateCantor.propTypes = {
    setNotification:    PropTypes.func.isRequired,
}

export default GenerateCantor
