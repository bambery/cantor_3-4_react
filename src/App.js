import React from 'react'
import { useState, useEffect } from 'react'

import Cantor from './models/cantor'

import { maxIter, maxSegments, minSegments, stateDefaults } from './shared/constants'
import Header from './components/Header'
import SetupCantor from './components/SetupCantor'
import ButtonSet from './components/ButtonSet'
import Numberline from './components/Numberline'
import CantorResults from './components/CantorResults'

//import logo from './logo.svg';
//import './App.css'

BigInt.prototype.toJSON = function() {
    return this.toString()
}


function App() {
    const [numSegments, setNumSegments] = useState(stateDefaults['numSegments'])
    const [numSegmentsStr, setNumSegmentsStr] = useState(stateDefaults['numSegments'].toString())
    const [toRemove, setToRemove] = useState(stateDefaults['toRemove'])
    const [toRemoveStr, setToRemoveStr] = useState(stateDefaults['toRemove'].toString())
    const [numIter, setNumIter] = useState(stateDefaults['numIter'])
    const [numIterStr, setNumIterStr] = useState(stateDefaults['numIter'].toString())
    const [formErrors, setFormErrors] = useState({
        'numSegments':  null,
        'toRemove':     null,
        'numIter':      null
    })
    const[cantor, setCantor] = useState( new Cantor(stateDefaults['numSegments'], stateDefaults['toRemove'], stateDefaults['numIter']) )
    const[displayResults, setDisplayResults] = useState(false)
    const[disableCanvas, setDisableCanvas] = useState(false)
    const[notification, setNotification] = useState({'notifications': []})

    useEffect( () => {
        if(!anyErrors()) {
            setDisableCanvas(false)
            console.log('#######################')
            console.log(`new cantor for ${numSegments}, ${toRemove}, ${numIter}**********`)
            console.log('#######################')
            setCantor( new Cantor(numSegments, toRemove, numIter) )
        } else {
            setDisableCanvas(true)
        }
    }, [numSegments, toRemove, numIter])


    const inputErrors = {
        'numSegments': `Please enter a number between ${minSegments} and ${maxSegments}.`,
        'toRemove': `Please enter a comma-separated list of numbers between 2 and ${numSegments - 1}. The first and last intervals may not be removed.`,
        'numIter': `Please enter a number between 1 and ${maxIter}.`
    }

    const handleNumSegmentsChange = (event) => {
        setNumSegmentsStr(event.target.value)
    }

    const handleToRemoveChange = (event) => {
        setToRemoveStr(event.target.value)
    }

    const handleNumIterChange = (event) => {
        setNumIterStr(event.target.value)
    }

    const validateFields = () => {
        let errorState = {...formErrors}

        //validate numSegments
        let legalNumSeg = /^\s*\d+\s*$/
        let checkToRemove = true

        if( !numSegmentsStr.match(legalNumSeg) ||
            !(numSegmentsStr > 2 && numSegmentsStr <= maxSegments)
        ){
            setNumSegments(null)
            errorState['numSegments'] = inputErrors['numSegments']
            errorState['toRemove'] = null
            checkToRemove = false
        } else {
            errorState['numSegments'] = null
            setNumSegments( parseInt(numSegmentsStr) )
        }

        // toRemove's validation depends on a legal value of numSegments
        if(checkToRemove){
            let legalToRem = /[\s,\d]+/
            if( !toRemoveStr ||
                !toRemoveStr.match(legalToRem)
            ){
                errorState['toRemove'] = inputErrors['toRemove']
                setToRemove(null)
            } else {
                // string was valid, convert to arr of numbers
                let arr = toRemoveStr.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) )
                // check that all numbers are greater than 1 and less than the number of segments
                let hasError = !arr.every( (val) => val > 1 && val < parseInt(numSegmentsStr) )
                if(!hasError){
                    setToRemove(arr)
                    errorState['toRemove'] = null
                } else {
                    setToRemove(null)
                    errorState['toRemove'] = inputErrors['toRemove']
                }
            }
        }
        let legalNumIter = /^\s*\d+\s*$/
        if(
            !numIterStr.match(legalNumIter) ||
            !( parseInt(numIterStr) > 0 && parseInt(numIterStr) <= maxIter)
        ){

            errorState['numIter'] = inputErrors['numIter']
            setNumIter(undefined)
        } else {
            errorState['numIter'] = null
            setNumIter(parseInt(numIterStr))
        }

        setFormErrors(errorState)
    }

    const handleLoseFocus = (event) => {
        const elementName = event.target.name
        validateFields()
    }

    const anyErrors = (specific=null) => {
        if(specific){
            return !!formErrors[specific]
        } else {
            return Object.values(formErrors).reduce((acc, curr) => acc || !!curr, false)
        }
    }

    const handleCantorizeClick = (event) => {
        event.preventDefault()
        if(anyErrors()){
            return
        }

        setCantor(new Cantor(numSegments, toRemove, numIter))
        setDisplayResults(true)
    }


    const showDemo = () => {
        return(
            <div className={`${disableCanvas ? 'disable-item': ''}`}>
                <Numberline intCol={cantor.iterations[0]} isDemo={true}/>
            </div>
        )
    }

    const showSetupButtons = () => {
        const setupButtonConfig = {
            'cantorize': {
                'text':     'Cantor-ize!',
                'color':    'button-blue',
                'type':     'submit',
                'disabled':    anyErrors()
            }
        }

        return(<ButtonSet buttonSetConfig={setupButtonConfig}/>)
    }

    const showCantor = () => {
        return(<CantorResults cantorSet={cantor}/>)
    }

    return (
        <div>
            <Header/>
            <form onSubmit={handleCantorizeClick}>
                <SetupCantor
                    numSegmentsStr={numSegmentsStr}
                    toRemoveStr={toRemoveStr}
                    numIterStr={numIterStr}
                    handleNumSegmentsChange={handleNumSegmentsChange}
                    handleToRemoveChange={handleToRemoveChange}
                    handleNumIterChange={handleNumIterChange}
                    handleLoseFocus={handleLoseFocus}
                    formErrors={formErrors}
                    anyErrors={anyErrors}
                />
                {!displayResults && showDemo()}
                {!displayResults && showSetupButtons()}

                {displayResults && showCantor()}
            </form>
        </div>
    )
}

export default App
