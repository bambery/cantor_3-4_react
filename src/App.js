import React from 'react'
import { useState, useEffect } from 'react'
import { AiOutlineDownload, AiOutlineCloseCircle, AiOutlineArrowUp } from 'react-icons/ai'
import { BsBorderStyle } from 'react-icons/bs'

import { maxIter, maxSegments, minSegments, stateDefaults } from './shared/constants'

import Header from './components/Header'
import ErrorNotification from './components/ErrorNotification'
import GenerateCantor from './components/GenerateCantor'
import ButtonSet from './components/ButtonSet'
import Introduction from './components/Introduction'

function App() {
    const [notification, setNotification] = useState()

    const showNotification = () => {
        return(<ErrorNotification error={notification}/>)
    }

    return (
        <main>
            <Header/>
            { notification && showNotification() }
            <Introduction />
            <GenerateCantor setNotification={setNotification}/>
        </main>
    )
}

export default App
