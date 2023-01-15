import React from 'react'
import PropTypes from 'prop-types'
//import { AiOutlineDownload, AiOutlineCloseCircle } from 'react-icons/ai'

const ButtonSet = ({ buttonSetConfig }) => {

    return(
        <div className='button-set'>
            { Object.values(buttonSetConfig).map((config, i) =>
                <button
                    key={i}
                    className={`button ${config['color']}`}
                    onClick={config['onClick']}
                    type={config['type']}
                    disabled={config['disabled']}
                >
                    <span className='icon'>
                        {config['icon']
                            ? React.createElement(config['icon'], { className: 'icon' })
                            : ''}
                    </span>
                    {config['text']}
                </button>
            )}
        </div>
    )
}

ButtonSet.propTypes = {
    buttonSetConfig: PropTypes.object.isRequired
}

export default ButtonSet
