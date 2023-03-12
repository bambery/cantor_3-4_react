import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Cantor from '../models/cantor'
import SetupStep from './SetupStep'
import Demo from './Demo'
import styles from './SetupCantor.module.css'
import { minSegments, maxSegments, maxIter, stateDefaults } from '../shared/constants'

const SetupCantor = ({ setNotification }) => {
    const [setup, setSetup] = useState({
        'numSegments':  stateDefaults['numSegments'],
        'toRemove':     stateDefaults['toRemove'],
        'numIter':      stateDefaults['numIter']
    })

    const [setupStr, setSetupStr] = useState({
        'numSegments':  stateDefaults['numSegments'].toString(),
        'toRemove':     stateDefaults['toRemove'].toString(),
        'numIter':      stateDefaults['numIter'].toString()
    })

    const [formErrors, setFormErrors] = useState({
        'numSegments':  null,
        'toRemove':     null,
        'numIter':      null
    })

    const [cantor, setCantor] = useState(null)
    const [displayResults, setDisplayResults] = useState(false)
    const [disableCanvas, setDisableCanvas] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleNumSegmentsChange = (event) => {
        const newSetupStr = {
            ...setupStr,
            numSegments: event.target.value
        }
        setSetupStr(newSetupStr)
    }

    const handleToRemoveChange = (event) => {
        const newSetupStr = {
            ...setupStr,
            toRemove: event.target.value
        }
        setSetupStr(newSetupStr)
    }

    const handleNumIterChange = (event) => {
        const newSetupStr = {
            ...setupStr,
            numIter: event.target.value
        }
        setSetupStr(newSetupStr)
    }

    const stepConfig = [
        {
            'name': 'numSegments',
            'title': 'Step 1',
            'valueStr': setupStr.numSegments,
            'handleChange': handleNumSegmentsChange,
            'instructions': 'How many segments should the line be divided into?',
            'modal': {
                title: 'Number of Segments',
                message: 'Enter a number between 3 and 30 and the line segment in the black box below will reflect your choice. Each segment will be numbered left to right.' }
        },
        {
            'name': 'toRemove',
            'title': 'Step 2',
            'valueStr': setupStr.toRemove,
            'handleChange': handleToRemoveChange,
            'instructions': 'How many segments should the line be divided into?',
            'modal': {
                title: 'Segments to Remove',
                message: 'Using the numbered line segment in the box below, select the number of the sections you wish to remove for each iteration of Cantor.' }
        },
        {
            'name': 'numIter',
            'title': 'Step 3',
            'valueStr': setupStr.numIter,
            'handleChange': handleNumIterChange,
            'instructions': 'How many iterations would you like to run?',
            'modal': {
                title: 'Number of Iterations',
                message: 'This number chooses how many times to run the Cantor process on a line segment. If you select 3, the page will display 3 numberlines, each one removing more segments from the previous.' }
        }
    ]

    // on first page load, present a default 3/4 set
    useEffect( () => {
        setCantor( new Cantor(setup.numSegments, setup.toRemove, setup.numIter) )
    }, [])

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
        /*
        try {
            let newCantor = new Cantor(numSegments, toRemove, numIter)
            setCantor(newCantor)
            setDisplayResults(true)
        } catch(e) {
            setNotification(e)
            setCantor( new Cantor(numSegments, toRemove, 1) )
        }
        */
    }

    const errorMessages = {
        'numSegments': `Please enter a number between ${minSegments} and ${maxSegments}.`,
        'toRemove': `Please enter a comma-separated list of numbers between 2 and ${parseInt(setupStr.numSegments) - 1}. The first and last intervals may not be removed.`,
        'numIter': `Please enter a number between 1 and ${maxIter}.`,
        'youDidACantor': 'Because you entered 3 in step 1, you have chosen to form the Cantor Set! Your only choice in this field is 2 :)'
    }

    const validateFields = () => {
        setDisableSubmit(false)
        let newFormErrors = { ...formErrors }
        let newSetup = { ...setup }

        //validate numSegments
        let legalNumSeg = /^\s*\d+\s*$/
        let checkToRemove = true

        if( !setupStr.numSegments.match(legalNumSeg) ||
            !(setupStr.numSegments > 2 && setupStr.numSegments <= maxSegments)
        ){
            newSetup.numSegments = null
            setSetup(newSetup)
            newFormErrors['numSegments'] = errorMessages['numSegments']
            newFormErrors['toRemove'] = null
            checkToRemove = false
        } else {
            newFormErrors['numSegments'] = null
            newSetup.numSegments = parseInt(setupStr.numSegments)
        }

        // toRemove's validation depends on a legal value of numSegments
        if(checkToRemove){
            let legalToRem = /[\s,\d]+/
            if (setupStr.numSegments === '3' && setupStr.toRemove !== '2'){
                newFormErrors['toRemove'] = errorMessages['youDidACantor']
                newSetup.toRemove = null
                setSetup(newSetup)
            } else if( !setupStr.toRemove ){
                setDisableSubmit(true)
                newFormErrors['toRemove'] = errorMessages['toRemove']
                newSetup.toRemove = []
                setSetup(newSetup)
            } else if( !setupStr.toRemove.match(legalToRem) ){
                newFormErrors['toRemove'] = errorMessages['toRemove']
                newSetup.toRemove = null
                setSetup(newSetup)
            } else {
                // string was valid, convert to arr of numbers
                let arr = setupStr.toRemove.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) )
                // check that all numbers are greater than 1 and less than the number of segments
                let hasError = !arr.every( (val) => val > 1 && val < parseInt(setupStr.numSegments) )
                if(!hasError){
                    // does this check need to happen? doesnt react do this?
                    if(JSON.stringify(arr) !== JSON.stringify(setup.toRemove)){
                        newSetup.toRemove = arr
                        setSetup(newSetup)
                    }
                    newFormErrors['toRemove'] = null
                } else {
                    newSetup.toRemove = null
                    setSetup(newSetup)
                    newFormErrors['toRemove'] = errorMessages['toRemove']
                }
            }
        }
        let legalNumIter = /^\s*\d+\s*$/
        if(
            !setupStr.numIter.match(legalNumIter) ||
            !( parseInt(setupStr.numIter) > 0 && parseInt(setupStr.numIter) <= maxIter)
        ){

            newFormErrors['numIter'] = errorMessages['numIter']
            newSetup.numIter = null
            setSetup(newSetup)
        } else {
            newFormErrors['numIter'] = null
            newSetup.numIter = parseInt(setupStr.numIter)
            setSetup(newSetup)
        }

        setFormErrors(newFormErrors)
    }

    function renderSetupStep(step){
        return(
            <SetupStep
                stepConfig={step}
                setup={setup}
                formErrors={formErrors}
                showResults={displayResults}
                setDisableSubmit={setDisableSubmit}
                validateFields={validateFields}
                key={step.name}
            />
        )
    }

    function renderDemo() {
        return(
            <Demo
                cantorIter = {cantor.iterations[0]}
                isDemo={true}
                loading={loading}
                disableCanvas={disableCanvas}
                toRemove={setup.toRemove}
            />
        )
    }

    return(
        <form autoComplete='off' onSubmit={handleCantorizeClick}>
            <div className={styles.setupCantor}>
                {stepConfig.map(s => renderSetupStep(s))}
            </div>
        </form>
    )
}

SetupCantor.propTypes = {
    setNotification:    PropTypes.func.isRequired,
}

export default SetupCantor
