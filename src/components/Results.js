import React from 'react'
import PropTypes from 'prop-types'
import Cantor from '../models/cantor'
import CantorIteration from './CantorIteration'
import ButtonSet from './ButtonSet'
import { AiOutlineDownload, AiOutlineCloseCircle, AiOutlineArrowUp } from 'react-icons/ai'
import styles from './Results.module.css'

function Results({ cantorSet, reopenForEdit, handleDownload }) {
    const resultsTopButtonConfig = {
        'download': {
            'text':     'Download Data',
            'color':    'button-blue',
            'type':     'button',
            'disabled': false,
            'onClick':  handleDownload,
            'icon':     AiOutlineDownload
        },
        'clear': {
            'text':     'Go Back & Edit',
            'color':    'button-gray',
            'type':     'button',
            'disabled': false,
            'onClick':  reopenForEdit,
            'icon':     AiOutlineCloseCircle
        }
    }

    const resultsBottomButtonsConfig = {
        /*
        'oneMore': {
            'text':     'One More Iteration!',
            'color':    'button-green',
            'type':     'buttton',
            'disabled': false,
            'onClick':  handleOneMore,
            'icon':     AiOutlinePlusCircle
        },
        */
        'download': {
            'text':     'Download Data',
            'color':    'button-blue',
            'type':     'button',
            'disabled': false,
            'onClick':  handleDownload,
            'icon':     AiOutlineDownload
        },
        'backToTop': {
            'text':     'Back to Top',
            'color':    'button-gray',
            'type':     'button',
            'disabled': false,
            'onClick':  (e) => { e.preventDefault(); window.location.href='#top' },
            'icon':     AiOutlineArrowUp
        }
    }

    return(
        <div className={styles.cantorResults}>
            <ButtonSet buttonSetConfig={resultsTopButtonConfig}/>
            <hr/>
            <div className={styles.cantorResultsDescription}>
                Cantor-like Set of {cantorSet.numSegments} Segmented Intervals, Removing Segment{cantorSet.toRemove.length > 1 ? 's' : ''} {cantorSet.toRemove.join(', ')}
            </div>
            {cantorSet.iterations.map( (iter, idx) => <CantorIteration key={idx} intCol={iter} index={idx}/>)}
            <hr/>
            <ButtonSet buttonSetConfig={resultsBottomButtonsConfig}/>
        </div>
    )
}

Results.propTypes = {
    cantorSet: PropTypes.instanceOf(Cantor),
    reopenForEdit:  PropTypes.func.isRequired,
    handleDownload: PropTypes.func.isRequired
}

export default Results
