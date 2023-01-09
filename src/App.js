import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import SetupCantor from './components/SetupCantor'
import Cantor from './models/cantor'

//import logo from './logo.svg';
//import './App.css'

function App() {
    const [numSegments, setNumSegments] = useState(4)

    const handleNumSegmentsChange= (event) => {
        setNumSegments(event.target.value)
    }

    return (
        <div>
            <Header/>
            <SetupCantor numSegments={numSegments} handleNumSegmentsChange={handleNumSegmentsChange}/>
        </div>
    )
}

export default App
