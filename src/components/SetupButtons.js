import React from 'react'
import PropTypes from 'prop-types'

const SetupButtons = ({ buttonSetConfig }) => {
    return(
        <div className='button-group'>
            { Object.values(buttonSetConfig).map((config, i) =>
                <button
                    key={i}
                    className={`button ${config['color']}`}
                    onClick={config['onClick']}
                    type={config['type']}
                    disabled={config['disabled']}
                >
                    {config['text']}
                </button>
            )}
        </div>
    )
}

SetupButtons.propTypes = {
    buttonSetConfig: PropTypes.object.isRequired
}

export default SetupButtons
