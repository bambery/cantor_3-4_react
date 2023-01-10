import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import SetupCantor from './components/SetupCantor'
import Cantor from './models/cantor'

//import logo from './logo.svg';
//import './App.css'

function App() {
    const [numSegments, setNumSegments] = useState(4)
    const [numSegmentsStr, setNumSegmentsStr] = useState("4")
    const [toRemove, setToRemove] = useState([3])
    const [toRemoveStr, setToRemoveStr] = useState("3")
    const [numIter, setNumIter] = useState(1)
    const [numIterStr, setNumIterStr] = useState("1")

    const [formErrors, setFormErrors] = useState({
        'numSegments':  null,
        'toRemove':     null,
        'numIter':      null
    })

    // this is arbitrary - should determine a sensible limit
    const maxSegments = 50
    const maxIter = 50

    const inputErrors = {
        'numSegments': `Please enter a number greater than 1 and less than ${maxSegments + 1}.`,
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

    const handleLoseFocus = (event) => {
        const elementName = event.target.name
        let newVal = event.target.value
        let hasError = false

        if(elementName == 'numSegments') {
            // regex is for ALLOWED
            let legal = /^\s*\d\s*$/
            if(
                !numSegmentsStr.match(legal) ||
                !(newVal > 2 && newVal <= maxSegments)
            ){
                hasError = true
                setNumSegments(undefined)
            } else {
                setNumSegments(parseInt(newVal))
            }
        } else if (elementName === 'toRemove') {
            // regex is for NOT ALLOWED
            let illegal = /[^\d,\s]/
            if(toRemoveStr.match(illegal)){
                hasError = true
                setToRemove(undefined)
            } else {
                // if string was valid, convert to array of numbers
                let arr = event.target.value.split(',').map( item => parseInt(item) ).filter( num => Number.isFinite(num) )
                // check that all numbers are greater than 1 and less than the number of segments
                hasError = !arr.every( (val) => val > 1 && val < numSegments )
                if(!hasError){
                    setToRemove(arr)
                }
            }
        } else if (elementName === 'numIter'){
            // regex is for ALLOWED
            let legal = /^\s*\d\s*$/
            if(
                !numIterStr.match(legal) ||
                !(newVal > 0 && newVal <= maxIter)
            ){
                hasError = true
                setNumIter(undefined)
            } else {
                setNumIter(parseInt(newVal))
            }
        }

        if(hasError){
            setFormErrors({
                ...formErrors,
                [elementName]: inputErrors[elementName],
            })
        } else {
            setFormErrors({
                ...formErrors,
                [elementName]: null,
            })
        }
    }

    return (
        <div>
            <Header/>
            <SetupCantor
                numSegmentsStr={numSegmentsStr}
                toRemoveStr={toRemoveStr}
                numIterStr={numIterStr}
                handleNumSegmentsChange={handleNumSegmentsChange}
                handleToRemoveChange={handleToRemoveChange}
                handleNumIterChange={handleNumIterChange}
                handleLoseFocus={handleLoseFocus}
                formErrors={formErrors}
            />
        </div>
    )
}

export default App
