import React from 'react'
import PropTypes from 'prop-types'
import Numberline from './Numberline'
import IntervalCollection from '../models/interval_collection'
import RiseLoader from 'react-spinners/RiseLoader'

const Demo = ({ cantorIter, isDemo, disableCanvas, loading, toRemove }) => {
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
        </div>
    )
}

Demo.propTypes = {
    cantorIter:     PropTypes.instanceOf(IntervalCollection),
    isDemo:         PropTypes.bool,
    disableCanvas:  PropTypes.bool,
    loading:        PropTypes.bool,
    toRemove:       PropTypes.array
}

export default Demo
