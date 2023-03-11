import React from 'react'
import PropTypes from 'prop-types'
import SetupStep from './SetupStep'
import styles from './SetupCantor.module.css'

const SetupCantor = ({ stepConfig, handleLoseFocus, formErrors, showResults }) => {

    function renderSetupStep(step){
        return(
            <SetupStep
                stepName={step.title}
                name={step.name}
                inputState={step.valueStr}
                handleInputChange={step.handleChange}
                handleLoseFocus={handleLoseFocus}
                formErrors={formErrors}
                showResults={showResults}
                key={step.name}
            />
        )
    }
    return(
        <div className={styles.setupCantor}>
            {stepConfig.map(s => renderSetupStep(s))}
        </div>
    )
}

SetupCantor.propTypes = {
    stepConfig: PropTypes.array.isRequired,
    handleLoseFocus: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired,
    showResults: PropTypes.bool.isRequired
}

export default SetupCantor
