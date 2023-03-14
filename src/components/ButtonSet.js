import React from 'react'
import PropTypes from 'prop-types'
import styles from './ButtonSet.module.css'

function ButtonSet({ buttonSetConfig }) {

    return(
        <div className={styles.buttonSet}>
            { Object.values(buttonSetConfig).map((config, i) =>
                <button
                    key={i}
                    className={`${styles.button} ${styles[ config['color'] ]}`}
                    onClick={config['onClick']}
                    type={config['type']}
                    disabled={config['disabled']}
                >
                    {config['icon']
                        ? React.createElement(config['icon'], { className: styles.icon })
                        : ''}
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
