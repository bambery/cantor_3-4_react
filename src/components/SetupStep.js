import React from 'react'
import { formInputValidation } from '../shared/utils'
import PropTypes from 'prop-types'

const SetupStep = (props) => {
    const { instructions, stepName, name, inputState, handleInputChange, handleLoseFocus } = props

    return(
        <div className='setup-step'>
            <div className='title'>
                {stepName}
            </div>
            <div className='instruction-box'>
                <div className='instruction'>
                    { instructions }
                </div>
                <div className='step-input'>
                    <input
                        value={inputState}
                        name={name}
                        onChange={handleInputChange}
                        onBlur={handleLoseFocus}

                    />
                </div>
            </div>
        </div>
    )
}

SetupStep.propTypes = {
    instructions: PropTypes.string.isRequired,
    stepName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inputState: formInputValidation,
    handleInputChange: PropTypes.func.isRequired,
    handleLoseFocus: PropTypes.func.isRequired

}

export default SetupStep
