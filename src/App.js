import React from 'react'
import { useState, useEffect } from 'react'
//import { AiOutlineDownload, AiOutlineCloseCircle, AiOutlinePlusCircle, AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineDownload, AiOutlineCloseCircle, AiOutlineArrowUp } from 'react-icons/ai'
import { BsBorderStyle } from 'react-icons/bs'

import Report from './models/report'
import { maxIter, maxSegments, minSegments, stateDefaults } from './shared/constants'

import Header from './components/Header'
import ErrorNotification from './components/ErrorNotification'
import SetupCantor from './components/SetupCantor'
import ButtonSet from './components/ButtonSet'
import CantorResults from './components/CantorResults'
import Demo from './components/Demo'
import Introduction from './components/Introduction'

function App() {
    const [notification, setNotification] = useState()

/*
    useEffect( () => {
        if(!anyErrors()) {
            // no errors: display numberline
            setDisableCanvas(false)
            setCantor( new Cantor(numSegments, toRemove, 1) )
        } else if(!anyErrors('numSegments') && !anyErrors('numIter') && !toRemoveStr.trim().length){
            // if there are an appropriate number of segments and no "impossible" entries in toRemove, display the demo numberline
            setDisableCanvas(false)
            setCantor( new Cantor(numSegments, toRemove, 1) )
        } else {
            // there is no sensible content to display, so grey out the numberline
            setDisableCanvas(true)
        }
    }, [numSegments, toRemove])
    */

    /*
    const validateFields = () => {
        setDisableSubmit(false)
        let errorState = { ...formErrors }

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
            if (numSegmentsStr === '3' && toRemoveStr !== '2'){
                errorState['toRemove'] = inputErrors['toRemove3Seg']
                setToRemove(null)
            } else if( !toRemoveStr ){
                if( numSegmentsStr !== '1' ){
                    setDisableSubmit(true)
                    errorState['toRemove'] = inputErrors['toRemove']
                }
                setToRemove([])
            } else if( !toRemoveStr.match(legalToRem) ){
                errorState['toRemove'] = inputErrors['toRemove']
                setToRemove(null)
            } else {
                // string was valid, convert to arr of numbers
                let arr = toRemoveStr.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) )
                // check that all numbers are greater than 1 and less than the number of segments
                // ***** do this in parent
                // ***********************
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
    */

    /*
    const showDemo = () => {
        return(
            <Demo
                cantorIter = {cantor.iterations[0]}
                isDemo={true}
                loading={loading}
                disableCanvas={disableCanvas}
                toRemove={toRemove}
            />
        )
    }
        */

    /*
    const showSetupButtons = () => {
        const setupButtonConfig = {
            'cantorize': {
                'text':     'Cantor-ize!',
                'color':    'button-blue',
                'type':     'submit',
                'disabled': disableSubmit || anyErrors(),
                'icon':     BsBorderStyle,
                'onClick':  handleCantorizeClick,
            }
        }

        return(<ButtonSet buttonSetConfig={setupButtonConfig}/>)
    }
    */

/*
    const handleOneMore = () => {
        const lastIntervalCol = cantor.iterations[cantor.numIter - 1]
        setCantor(cantor.performOneIteration(lastIntervalCol))
    }
*/
    /*
    const showResultsTopButtons = () => {
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
    */

    /*
    const showResultsBottomButtons = () => {
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
    */

    /*
    const handleClearForm = () => {
        setNumSegmentsStr(stateDefaults['numSegments'].toString())
        setToRemoveStr(stateDefaults['toRemove'].toString())
        setNumIterStr(stateDefaults['numIter'].toString())
        setDisplayResults(false)
        setNumSegments(stateDefaults['numSegments'])
        setNumIter(stateDefaults['numIter'])
        setToRemove(stateDefaults['toRemove'])
    }
    */

    const handleDownloadReport = (cantor) => {
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

    const showNotification = () => {
        return(<ErrorNotification error={notification}/>)
    }

    return (
        <main>
            <Header/>
            { notification && showNotification() }
            <Introduction />
            <SetupCantor setNotification={setNotification}/>
        </main>
    )
}

export default App

/*
            {displayResults && cantor && showResultsTopButtons()}
                {!displayResults && cantor && showDemo()}
                {!displayResults && cantor && showSetupButtons()}

                {displayResults && cantor && showCantor()}
                {displayResults && cantor && showResultsBottomButtons()}
                */
