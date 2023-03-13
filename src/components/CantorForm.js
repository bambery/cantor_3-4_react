import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Report from '../models/report'
import Cantor from '../models/cantor'
import { stateDefaults } from '../shared/constants'

import styles from './CantorForm.module.css'
import CantorInputs from './CantorInputs'
import Results from './Results'
import Demo from './Demo'

const CantorForm = ({ setNotification }) => {
    const [setup, setSetup] = useState({
        'numSegments':  stateDefaults['numSegments'],
        'toRemove':     stateDefaults['toRemove'],
        'numIter':      stateDefaults['numIter']
    })

    const [setupStr, setSetupStr] = useState({
        'numSegments':  setup['numSegments'] ? setup['numSegments'].toString() : '',
        'toRemove':     setup['toRemove'] ? setup['toRemove'].toString() : '',
        'numIter':      setup['numIter'] ? setup['numIter'].toString() : ''
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

    useEffect( () => {
        if( !anyErrors('numSegments') && !anyErrors('toRemove') ){
            // no errors that would affect the numberline, display numberline
            setDisableCanvas(false)
            setCantor( new Cantor(setup.numSegments, setup.toRemove, 1) )
        } else if(!anyErrors('numSegments') && !setupStr['toRemove'].length) {
            // valid numSeg, blank toRemove can display a numberline with no gaps
            setDisableCanvas(false)
            setCantor( new Cantor(setup.numSegments, [], 1) )
        } else if( !anyErrors('numSegments') && anyErrors('toRemove') ){
            // valid numSeg, invalid toRemove should update numberline but grey it out
            setDisableCanvas(true)
            setCantor( new Cantor(setup.numSegments, [], 1) )
        } else {
            //otherwise, there is nothing sensible to display so grey out the numberline
            setDisableCanvas(true)
        }
    }, [setup])

    useEffect( () => {
        if(anyErrors()){
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [formErrors])

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
                loading={loading}
                disableCanvas={disableCanvas}
                disableSubmit={disableSubmit}
                handleCantorizeClick={handleCantorizeClick}
                toRemove={setup.toRemove}
            />
        )
    }

    const reopenForEdit = () => {
        setDisplayResults(false)
    }

    const handleDownload = () => {
        const report = new Report(cantor)
        const blob = new Blob([report.output], { type: 'text/csv;charset=utf-8,' })
        const objUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('download', `cantorSet-${cantor.numSegments}Seg-${cantor.toRemove.join('_')}Removed-${cantor.numIter}Iter.csv`)
        link.setAttribute('href', objUrl)
        link.setAttribute('visibility', 'hidden')
        link.setAttribute('display', 'none')
        link.click()
    }

    const renderResults = () => {
        return(
            <Results
                cantorSet={cantor}
                reopenForEdit={reopenForEdit}
                handleDownload={handleDownload}
            />
        )
    }

    return(
        <form autoComplete='off' onSubmit={handleCantorizeClick}>
            <CantorInputs
                setup={setup}
                setSetup={setSetup}
                setupStr={setupStr}
                setSetupStr={setSetupStr}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                disableSubmit={disableSubmit}
                setDisableSubmit={setDisableSubmit}
                displayResults={displayResults}
            />
            { !displayResults && renderDemo() }
            { displayResults && renderResults() }
        </form>
    )
}

CantorForm.propTypes = {
    setNotification:    PropTypes.func.isRequired,
}

export default CantorForm
