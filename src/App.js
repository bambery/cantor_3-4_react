import React from 'react'
import { useState } from 'react'
import { strToNumArr } from './shared/utils'
import Header from './components/Header'
import SetupCantor from './components/SetupCantor'
import Cantor from './models/cantor'

//import logo from './logo.svg';
//import './App.css'

window.strToNumArr = strToNumArr

function App() {
    const [numSegments, setNumSegments] = useState(4)
    const [toRemove, setToRemove] = useState([2, 3])
    const [numIter, setNumIter] = useState(1)
    const [formErrors, setFormErrors] = useState({
        'numSegments':  null,
        'toRemove':     null,
        'numIter':      null
    })

    // this is arbitrary - should determine a sensible limit
    const maxSegments = 50
    const maxIter = 50

    const inputErrors = {
        'numSegments': `Please enter a number greater than 1 and less then ${maxSegments}.`,
        'toRemove': `Cannot remove the first or last segment in an interval. Please enter a list of numbers between 2 and ${maxSegments - 1}.`,
        'numIter': `Please enter a number between 1 and ${maxIter}.`
    }

    const handleNumSegmentsChange = (event) => {
        setNumSegments(event.target.value)
    }

    const handleToRemoveChange = (event) => {
        setToRemove(strToNumArr(event.target.value))
    }

    const handleNumIterChange = (event) => {
        setNumIter(event.target.value)
    }

    const handleLoseFocus = (event) => {
        const elementName = event.target.name
        let newVal = event.target.value
        let hasError = null

        switch(elementName) {
            case 'numSegments':
                setToRemove([])
                hasError = !(newVal === 'undefined' || (newVal > 2 && newVal < maxSegments))
                break
            case 'toRemove':
                newVal = newVal.split(',')
                hasError = !newVal.every( (val) => val > 1 && val <= numSegments )
                break
            case 'numIter':
                hasError = !(newVal > 0 && newVal <= maxIter)
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
                numSegments={numSegments}
                toRemove={toRemove}
                numIter={numIter}
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
