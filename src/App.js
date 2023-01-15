import React from 'react'
import { useState, useEffect } from 'react'
import { AiOutlineDownload, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineArrowUp } from 'react-icons/ai'
import { BsBorderStyle } from 'react-icons/bs'

import Cantor from './models/cantor'
import Report from './models/report'
import { maxIter, maxSegments, minSegments, stateDefaults } from './shared/constants'

import Header from './components/Header'
import SetupCantor from './components/SetupCantor'
import ButtonSet from './components/ButtonSet'
import Numberline from './components/Numberline'
import CantorResults from './components/CantorResults'

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
    const [cantor, setCantor] = useState(null)
    const[displayResults, setDisplayResults] = useState(false)
    const[disableCanvas, setDisableCanvas] = useState(false)
    const[notification, setNotification] = useState({'notifications': []})

    useEffect( () => {
        let defaultCantor = new Cantor(stateDefaults['numSegments'], stateDefaults['toRemove'], stateDefaults['numIter'])
        setCantor(defaultCantor)
    }, [])

    useEffect( () => {
        if(!anyErrors()) {
            setDisableCanvas(false)
            setCantor( new Cantor(numSegments, toRemove, 1) )
        } else {
            setDisableCanvas(true)
        }
    }, [numSegments, toRemove])

    const inputErrors = {
        'numSegments': `Please enter a number between ${minSegments} and ${maxSegments}.`,
        'toRemove': `Please enter a comma-separated list of numbers between 2 and ${parseInt(numSegmentsStr) - 1}. The first and last intervals may not be removed.`,
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
                    if(JSON.stringify(arr) !== JSON.stringify(toRemove)){
                        setToRemove(arr)
                    }
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
                'disabled': anyErrors(),
                'icon':     BsBorderStyle,
                'onClick':  handleCantorizeClick,
            }
        }

        return(<ButtonSet buttonSetConfig={setupButtonConfig}/>)
    }

    const handleOneMore = () => {
        const lastIntervalCol = cantor.iterations[cantor.numIter - 1]
        setCantor(cantor.performOneIteration(lastIntervalCol))
    }

    const showResultsTopButtons = (cantor) => {
        const resultsTopButtonConfig = {
            'download': {
                'text':     'Download Data',
                'color':    'button-blue',
                'type':     'button',
                'disabled': false,
                'onClick':  handleDownloadReport,
                'icon':     AiOutlineDownload
            },
            'clear': {
                'text':     'Clear & Start Over',
                'color':    'button-gray',
                'type':     'button',
                'disabled': false,
                'onClick':  handleClearForm,
                'icon':     AiOutlineCloseCircle
            }
        }
        return(<ButtonSet buttonSetConfig={resultsTopButtonConfig}/>)
    }

    const showResultsBottomButtons = (cantor) => {
        const resultsBottomButtonsConfig = {
            'oneMore': {
                'text':     'One More Iteration!',
                'color':    'button-green',
                'type':     'buttton',
                'disabled': false,
                'onClick':  handleOneMore,
                'icon':     AiOutlinePlusCircle
            },
            'download': {
                'text':     'Download Data',
                'color':    'button-blue',
                'type':     'button',
                'disabled': false,
                'onClick':  handleDownloadReport,
                'icon':     AiOutlineDownload
            },
            'backToTop': {
                'text':     'Back to Top',
                'color':    'button-gray',
                'type':     'button',
                'disabled': false,
                'onClick':  (e) => { e.preventDefault(); window.location.href='#top' },
                'icon':     AiOutlineArrowUp
            }
        }
        return(<ButtonSet buttonSetConfig={resultsBottomButtonsConfig}/>)
    }

    const handleClearForm = () => {
        setNumSegmentsStr('')
        setToRemoveStr('')
        setNumIterStr('')
        setDisplayResults(false)
        setNumSegments(1)
        setToRemove([])
    }

    const tempHandler = () => {
        typeof Function.prototype === "function"
    }

    const handleDownloadReport = () => {
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
                {displayResults && cantor && showResultsTopButtons()}
                {!displayResults && cantor && showDemo()}
                {!displayResults && cantor && showSetupButtons()}

                {displayResults && cantor && showCantor()}
                {displayResults && cantor && showResultsBottomButtons()}
            </form>
        </div>
    )
}

export default App
