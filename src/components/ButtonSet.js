import React from 'react'
import PropTypes from 'prop-types'

const ButtonSet = ({ buttonSetConfig }) => {
    return(
        <div className='button-set'>
            { Object.values(buttonSetConfig).map((config, i) =>
                <input
                    key={i}
                    className={`button ${config['color']}`}
                    onClick={config['onClick']}
                    type={config['type']}
                    disabled={config['disabled']}
                    value={config['text']}
                />
            )}
        </div>
    )
}

ButtonSet.propTypes = {
    buttonSetConfig: PropTypes.object.isRequired
}

export default ButtonSet
