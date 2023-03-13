import React from 'react'
import { useState } from 'react'

import Header from './components/Header'
import ErrorNotification from './components/ErrorNotification'
import CantorForm from './components/CantorForm'
import Introduction from './components/Introduction'

function App() {
    const [notification, setNotification] = useState()

    const showNotification = () => {
        return(<ErrorNotification error={notification}/>)
    }

    return (
        <main>
            <div className='centeringDiv'>
                <Header/>
                { notification && showNotification() }
                <Introduction />
                <CantorForm setNotification={setNotification}/>
            </div>
        </main>
    )
}

export default App
