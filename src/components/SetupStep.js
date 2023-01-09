import React from 'react'
import PropTypes from 'prop-types'

const SetupStep = (props) => {
    const { instructions, stepName , inputState } = props

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
                </div>
            </div>
        </div>
    )
}

SetupStep.propTypes = {
    instructions: PropTypes.string.isRequired,
    stepName: PropTypes.string.isRequired,
    inputState: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default SetupStep
