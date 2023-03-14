import React from 'react'
import PropTypes from 'prop-types'
import Numberline from './Numberline'
import ButtonSet from './ButtonSet'
import IntervalCollection from '../models/interval_collection'
import RiseLoader from 'react-spinners/RiseLoader'
import { BsBorderStyle } from 'react-icons/bs'
import styles from './Demo.module.css'

function Demo({ cantorIter, disableCanvas, loading, toRemove, disableSubmit, handleCantorizeClick }) {

    const setupButtonConfig = {
        'cantorize': {
            'text':     'Cantor-ize!',
            'color':    'button-blue',
            'type':     'submit',
            'disabled': disableSubmit,
            'icon':     BsBorderStyle,
            'onClick':  handleCantorizeClick,
        }
    }

    return (
        <div className={styles.spinnerParent}>
            <div className={ `${loading ? '' : styles.hidden} loadingSpinner`} >
                <RiseLoader
                    color={getComputedStyle(document.body).getPropertyValue('--color-dark-bluish')}
                />
            </div>
            <div className={`${(disableCanvas || loading) ? 'disableItem': ''}`}>
                <Numberline
                    intCol={cantorIter}
                    isDemo={true}
                    toRemove={toRemove ? toRemove : []}
                />
            </div>
            <ButtonSet buttonSetConfig={setupButtonConfig}/>
        </div>
    )
}

Demo.propTypes = {
    cantorIter:         PropTypes.instanceOf(IntervalCollection),
    disableCanvas:      PropTypes.bool,
    loading:            PropTypes.bool,
    toRemove:           PropTypes.array,
    disableSubmit:      PropTypes.bool.isRequired,
    handleCantorizeClick:   PropTypes.func.isRequired
}

export default Demo
