import React from 'react'
import PropTypes from 'prop-types'
import Numberline from './Numberline'
import ButtonSet from './ButtonSet'
import IntervalCollection from '../models/interval_collection'
import RiseLoader from 'react-spinners/RiseLoader'
import { BsBorderStyle } from 'react-icons/bs'
import { useState, useEffect } from 'react'

const Demo = ({ cantorIter, isDemo, disableCanvas, loading, toRemove, disableSubmit, handleCantorizeClick }) => {

    console.log('indemo')
    console.log(cantorIter)

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
        <div className='spinner-parent'>
            <div className={ `${ loading ? '' : 'hidden'} loading-spinner`} >
                <RiseLoader
                    color={getComputedStyle(document.body).getPropertyValue('--color-dark-bluish')}
                />
            </div>
            <div className={`${(disableCanvas || loading) ? 'disable-item': ''}`}>
                <Numberline
                    intCol={cantorIter}
                    isDemo={isDemo}
                    toRemove={toRemove}
                />
            </div>
            <ButtonSet buttonSetConfig={setupButtonConfig}/>
        </div>
    )
}

Demo.propTypes = {
    cantorIter:         PropTypes.instanceOf(IntervalCollection),
    isDemo:             PropTypes.bool,
    disableCanvas:      PropTypes.bool,
    loading:            PropTypes.bool,
    toRemove:           PropTypes.array,
    disableSubmit:      PropTypes.bool.isRequired,
    handleCantorizeClick:   PropTypes.func.isRequired
}

export default Demo
